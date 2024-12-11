# OpenWebUI Extension

A custom Chrome extension for OpenWebUI integration. 

## Overview

This extension enables direct interaction with your OpenWebUI server through Google Chrome. Please note that this is a work in progress with limited functionality, though the core features are operational.

## Prerequisites

- OpenWebUI Server
- Valid AI Model
- API access enabled

## Setup Instructions

1. Login to your OpenWebUI and obtain a user API key

2. Modify `scripts/api.js` with your configuration:
```javascript
class OpenWebUIAPI {
  constructor() {
    this.baseUrl = 'https://openwebui-url.local:8080';
    this.model = 'llama-3.3-70b-versatile';
    this.apiKey = 'sk-USER-API-KEY';
  }
```

3. Update `scripts/background.js` line 3 with your OpenWebUI URL

## Planned Features

- Chat synchronization with OpenWebUI
- Current tab content awareness
- Automatic API key retrieval
- Image generation capabilities
- Form auto-fill using OpenWebUI memory

## Future Integration Goals

- Speech integration
- Voice integration

## Contributing

Contributions are welcome! Feel free to help improve this extension.
