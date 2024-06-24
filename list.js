function loadWords() {
    chrome.storage.local.get(['words'], function(result) {
      const listElement = document.getElementById('wordList');
      listElement.innerHTML = '';
      result.words.forEach(word => {
        const item = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
          chrome.runtime.sendMessage({ action: "deleteWords", wordsToDelete: [word] }, response => {
            loadWords(); // Refresh the list
          });
        };
        item.textContent = word + ' ';
        item.appendChild(deleteButton);
        listElement.appendChild(item);
      });
    });
  }
  
  loadWords();
  