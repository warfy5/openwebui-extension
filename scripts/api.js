class OpenWebUIAPI {
  constructor() {
    this.baseUrl = 'https://openwebui-url.local:8080';
    this.model = 'llama-3.3-70b-versatile';
    this.apiKey = 'sk-USER-API-KEY';
  }

  async sendMessage(message) {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{
            role: 'user',
            content: message
          }],
          stream: false // The official extension uses streaming, but let's keep it simple for now
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data.choices || !data.choices[0]) {
        throw new Error('Invalid response format');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

window.OpenWebUIAPI = OpenWebUIAPI;