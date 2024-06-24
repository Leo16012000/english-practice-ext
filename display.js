let index = 0;
let interval = 2000; 

function showWord() {
    chrome.storage.local.get(['words', 'interval','count'], (result) => {
      if (index < result.count) {
        document.getElementById('wordDisplay').textContent = result.words[index++];
        setTimeout(showWord, result.interval); 
      } else {
        document.getElementById('wordDisplay').textContent = "Practice Complete!";
        index = 0;
      }
    });
  }

document.addEventListener('DOMContentLoaded', showWord);
