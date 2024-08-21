document.addEventListener('click', function (event) {
  let targetElement = event.target;

  while (targetElement && targetElement.tagName !== 'A') {
    targetElement = targetElement.parentElement;
  }

  if (targetElement && targetElement.tagName === 'A') {
    const linkUrl = targetElement.href;

    const isNewTab =
      event.ctrlKey ||
      event.shiftKey ||
      event.metaKey ||
      event.button === 1 ||
      targetElement.target === '_blank';

    event.preventDefault(); // 기본 링크 클릭 동작 먼저 막기

    chrome.storage.local.get(['siteFilterOn'], (result) => {
      if (!result.siteFilterOn) {
        if (isNewTab) {
          window.open(linkUrl, '_blank');
        } else {
          window.location.href = linkUrl;
        }
        return;
      }

      chrome.storage.local.get([linkUrl], function (storageResult) {
        if (chrome.runtime.lastError) {
          console.error(
            'Error accessing storage:',
            chrome.runtime.lastError.message
          );
          // API 요청 실패 시 기존 동작 수행
          if (isNewTab) {
            window.open(linkUrl, '_blank');
          } else {
            window.location.href = linkUrl;
          }
          return;
        }

        if (storageResult[linkUrl]) {
          const storedData = storageResult[linkUrl];

          if (storedData.riskInfo !== 'none') {
            const blockedUrl =
              chrome.runtime.getURL('blocked.html') +
              `?url=${encodeURIComponent(
                linkUrl
              )}&threatType=${encodeURIComponent(storedData.riskInfo)}`;
            window.location.href = blockedUrl;
          } else {
            if (isNewTab) {
              window.open(linkUrl, '_blank');
            } else {
              window.location.href = linkUrl;
            }
          }
        } else {
          chrome.runtime.sendMessage(
            {
              type: 'checkLink',
              url: linkUrl,
            },
            function (response) {
              if (chrome.runtime.lastError) {
                console.error(
                  'Runtime error:',
                  chrome.runtime.lastError.message
                );
                // API 요청 실패 시 기존 동작 수행
                if (isNewTab) {
                  window.open(linkUrl, '_blank');
                } else {
                  window.location.href = linkUrl;
                }
                return;
              }

              if (response && response.success) {
                const siteData = response.siteData[0]; // 첫 번째 매치 데이터 사용

                chrome.storage.local.set({ [linkUrl]: siteData }, function () {
                  if (chrome.runtime.lastError) {
                    console.error(
                      'Error saving to storage:',
                      chrome.runtime.lastError.message
                    );
                    return;
                  }
                  console.log(
                    `Link ${linkUrl} with threat type ${siteData.riskInfo} has been saved.`
                  );
                });

                if (siteData.riskInfo !== 'none') {
                  const blockedUrl =
                    chrome.runtime.getURL('blocked.html') +
                    `?url=${encodeURIComponent(
                      linkUrl
                    )}&threatType=${encodeURIComponent(siteData.riskInfo)}`;
                  window.location.href = blockedUrl;
                } else {
                  if (isNewTab) {
                    window.open(linkUrl, '_blank');
                  } else {
                    window.location.href = linkUrl;
                  }
                }
              } else {
                console.error('API request failed.');
                // API 요청 실패 시 기존 동작 수행
                if (isNewTab) {
                  window.open(linkUrl, '_blank');
                } else {
                  window.location.href = linkUrl;
                }
              }
            }
          );
        }
      });
    });
  }
});
