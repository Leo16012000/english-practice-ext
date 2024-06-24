chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ words: [] });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case "addWord":
        console.log("run into add word")
        chrome.storage.local.get(['words'], function(result) {
          let updatedWords = result.words.includes(request.newWord) ? result.words : result.words.concat(request.newWord);
          chrome.storage.local.set({ words: updatedWords }, () => {
            sendResponse({ status: "Word added" });
          });
        });
        break;
      case "deleteWords":
        chrome.storage.local.get(['words'], function(result) {
          let remainingWords = result.words.filter(word => !request.wordsToDelete.includes(word));
          chrome.storage.local.set({ words: remainingWords }, () => {
            sendResponse({ status: "Words deleted" });
          });
        });
        break;
    }
    return true;
  });
  