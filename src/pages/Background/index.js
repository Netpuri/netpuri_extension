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
      .then((data) => sendResponse({ success: true, data: data }))
      .catch((error) => sendResponse({ success: false, error: error.message }));

    return true;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['siteFilterOn'], (result) => {
    if (result.siteFilterOn === undefined) {
      chrome.storage.local.set({ siteFilterOn: true }, () => {
        console.log('Default siteFilterOn set to true');
      });
    }
  });
});
