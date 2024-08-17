document.addEventListener('click', function (event) {
  try {
    let targetElement = event.target;

    while (targetElement && targetElement.tagName !== 'A') {
      targetElement = targetElement.parentElement;
    }

    if (targetElement && targetElement.tagName === 'A') {
      event.preventDefault(); // 기본 링크 클릭 동작 막기
      const linkUrl = targetElement.href;

      if (chrome && chrome.storage && chrome.storage.local) {
        // 저장소에서 해당 링크 확인
        chrome.storage.local.get([linkUrl], function (result) {
          if (chrome.runtime.lastError) {
            console.error(
              'Error accessing storage:',
              chrome.runtime.lastError.message
            );
            return;
          }

          if (result[linkUrl]) {
            // 저장소에 링크가 이미 있을 경우
            const storedData = result[linkUrl];
            alert(
              `This link (${linkUrl}) is already in the storage with threat type: ${storedData.threatType}`
            );
            console.log(`Stored data for ${linkUrl}:`, storedData);

            // threatType이 'none'이 아닐 경우 확장 프로그램의 blocked.html로 이동
            if (storedData.threatType !== 'none') {
              const blockedUrl =
                chrome.runtime.getURL('blocked.html') +
                `?url=${encodeURIComponent(
                  linkUrl
                )}&threatType=${encodeURIComponent(storedData.threatType)}`;
              window.location.href = blockedUrl;
            } else {
              window.location.href = linkUrl;
            }
          } else {
            // 저장소에 링크가 없을 경우 API 요청
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
                  alert('There was a problem processing your request.');
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

                    // 링크와 threatType 저장
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

                    alert(
                      `Link check successful: Link ${linkUrl} is marked as ${threatType}.`
                    );
                    console.log('Link check successful:', response.data);

                    // threatType이 'none'이 아닐 경우 확장 프로그램의 blocked.html로 이동
                    if (threatType !== 'none') {
                      const blockedUrl =
                        chrome.runtime.getURL('blocked.html') +
                        `?url=${encodeURIComponent(
                          linkUrl
                        )}&threatType=${encodeURIComponent(threatType)}`;
                      window.location.href = blockedUrl;
                    } else {
                      window.location.href = linkUrl;
                    }
                  } else {
                    // matches가 비어있을 경우
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

                    // API 요청 성공 시 링크로 이동
                    window.location.href = linkUrl;
                  }
                } else {
                  const error = response ? response.error : 'Unknown error';
                  alert('Link check failed: ' + error);
                  console.error('Link check failed:', error);
                }
              }
            );
          }
        });
      } else {
        console.error('chrome.storage is not accessible.');
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
