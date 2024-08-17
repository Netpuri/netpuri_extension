document.addEventListener('click', function (event) {
  let targetElement = event.target;

  while (targetElement && targetElement.tagName !== 'A') {
    targetElement = targetElement.parentElement;
  }

  if (targetElement && targetElement.tagName === 'A') {
    const linkUrl = targetElement.href;

    // 새 탭에서 열리도록 의도된 경우를 확인
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
          window.open(linkUrl, '_blank'); // 새 탭에서 열기
        } else {
          window.location.href = linkUrl; // 같은 탭에서 열기
        }
        return;
      }

      if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get([linkUrl], function (result) {
          if (chrome.runtime.lastError) {
            console.error(
              'Error accessing storage:',
              chrome.runtime.lastError.message
            );
            return;
          }

          if (result[linkUrl]) {
            const storedData = result[linkUrl];

            if (storedData.threatType !== 'none') {
              const blockedUrl =
                chrome.runtime.getURL('blocked.html') +
                `?url=${encodeURIComponent(
                  linkUrl
                )}&threatType=${encodeURIComponent(storedData.threatType)}`;
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
                  return;
                }

                if (response && response.success) {
                  if (
                    response.data &&
                    response.data.matches &&
                    response.data.matches.length > 0
                  ) {
                    const threatInfo = response.data.matches[0];
                    const threatType = threatInfo.threatType;

                    chrome.storage.local.set(
                      {
                        [linkUrl]: { threatType: threatType, url: linkUrl },
                      },
                      function () {
                        if (chrome.runtime.lastError) {
                          console.error(
                            'Error saving to storage:',
                            chrome.runtime.lastError.message
                          );
                          return;
                        }
                        console.log(
                          `Link ${linkUrl} with threat type ${threatType} has been saved.`
                        );
                      }
                    );

                    if (threatType !== 'none') {
                      const blockedUrl =
                        chrome.runtime.getURL('blocked.html') +
                        `?url=${encodeURIComponent(
                          linkUrl
                        )}&threatType=${encodeURIComponent(threatType)}`;
                      window.location.href = blockedUrl;
                    } else {
                      if (isNewTab) {
                        window.open(linkUrl, '_blank');
                      } else {
                        window.location.href = linkUrl;
                      }
                    }
                  } else {
                    chrome.storage.local.set(
                      { [linkUrl]: { threatType: 'none', url: linkUrl } },
                      function () {
                        if (chrome.runtime.lastError) {
                          console.error(
                            'Error saving to storage:',
                            chrome.runtime.lastError.message
                          );
                          return;
                        }
                        console.log(
                          `Link ${linkUrl} with no threat has been saved.`
                        );
                      }
                    );

                    if (isNewTab) {
                      window.open(linkUrl, '_blank');
                    } else {
                      window.location.href = linkUrl;
                    }
                  }
                } else {
                  console.error('API request failed.');
                }
              }
            );
          }
        });
      } else {
        console.error('chrome.storage is not accessible.');
      }
    });
  }
});
