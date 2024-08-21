chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'checkLink') {
    const urlToCheck = message.url;

    fetch(`http://localhost:8080/api/checkUrl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: urlToCheck }),
    })
      .then((response) => response.json())
      .then((data) => {
        const result = {
          success: true,
          data: data,
          timestamp: new Date().toISOString(),
        };

        const threatTypeMap = {
          MALWARE: '멀웨어',
          SOCIAL_ENGINEERING: '피싱',
          UNWANTED_SOFTWARE: '원치 않는 소프트웨어',
          POTENTIALLY_HARMFUL_APPLICATION: '잠재적 유해 애플리케이션',
        };

        const siteData = data.matches.map((match, index) => {
          const shortThreatType = threatTypeMap[match.threatType] || '기타';

          return {
            id: index + 1,
            title: `위험 사이트 - ${shortThreatType}`,
            url: match.threat.url,
            favicon: `https://www.google.com/s2/favicons?domain=${
              new URL(match.threat.url).hostname
            }`,
            categories: [shortThreatType],
            visitTime: result.timestamp.replace('T', ' ').slice(0, 19),
            riskInfo: shortThreatType,
            siteDetails: [
              `위험 유형: ${shortThreatType}`,
              `플랫폼: ${match.platformType}`,
              `캐시 유지 시간: ${match.cacheDuration}`,
            ],
          };
        });

        chrome.storage.local.set({ [urlToCheck]: siteData[0] }, () => {
          if (chrome.runtime.lastError) {
            console.error(
              'Error saving to storage:',
              chrome.runtime.lastError.message
            );
            return;
          }
          sendResponse({ success: true, siteData });
        });
      })
      .catch((error) => {
        sendResponse({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      });

    return true;
  }
});

// 백그라운드에서 API 요청을 처리하는 함수
async function checkTextWithAPI(text) {
  const response = await fetch('http://localhost:8080/api/checkText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      texts: [text],
    }),
  });

  const result = await response.json();
  return result.hazard ? result.hazardous_texts : [];
}

// 우클릭 메뉴 생성
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'toggleHighlight',
    title: '유해 텍스트 보이기/가리기',
    contexts: ['all'],
  });
});

// 우클릭 메뉴 선택 시 동작
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'toggleHighlight') {
    chrome.tabs.sendMessage(tab.id, { action: 'toggleHighlight' });
  }
});

// 메시지를 받아 API 요청을 보내고 결과를 반환
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkText') {
    checkTextWithAPI(message.text).then((hazardousTexts) => {
      sendResponse({ hazardousTexts });
    });
    return true; // 비동기 응답을 위해 true 반환
  }
});
