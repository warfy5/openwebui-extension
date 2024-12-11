chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'sendMessage') {
    fetch('http://openwebui-url.local:8080/api/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `sk-USER_API_KEY`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: request.message
          }
        ]
      })
    })
    .then(response => response.json())
    .then(data => sendResponse(data))
    .catch(error => sendResponse({ error: error.message }));
    
    return true;
  }
});