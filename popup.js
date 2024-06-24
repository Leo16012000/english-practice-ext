document.getElementById('addWord').addEventListener('click', () => {
    console.log("run into popup add word")
    const newWord = document.getElementById('wordInput').value.trim();
    if (newWord) {
        chrome.runtime.sendMessage({ action: "addWord", newWord }, response => {
            document.getElementById('wordInput').value = ''; 
        });
    } else {
        alert("Please enter a word.");
    }
});

document.getElementById('showList').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.extension.getURL('list.html') });
});
document.getElementById('generateWords').addEventListener('click', () => {
    const count = parseInt(document.getElementById('numWords').value, 10);
    const interval = parseInt(document.getElementById('practiceInterval').value, 10);
    chrome.storage.local.set({ interval: interval,count:count }, () => {
        chrome.tabs.create({ url: chrome.extension.getURL('display.html') });
    });
});
