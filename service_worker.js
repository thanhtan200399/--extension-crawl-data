chrome.action.onClicked.addListener((tab) => {
  console.log(cookies);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {},
  });
});
