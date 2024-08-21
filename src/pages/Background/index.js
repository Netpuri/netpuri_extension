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
