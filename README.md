# openwebui-extension
A custom openweb ui extension for google chrome. 
Prerquisites:
OpenWebUI Server, with a valid AI Model, and API access enabled. 

This is a work in progress. Expect very little form this extension. It does however work, just not well. 

Instructions:
Login to your OpenWebUI and get an API key for the user. 

Modify scripts/api.js with your openwebui url and api key and model:


class OpenWebUIAPI {

  constructor() {
  
    this.baseUrl = '**https://openwebui-url.local:8080**';
    
    this.model = '**llama-3.3-70b-versatile**';
    
    this.apiKey = '**sk-USER-API-KEY**';
    
  }


Modify line 3 of scripts/background.js

to be your openwebui url. 

Feel free to contribute if you would like to assist. 

Planned Features:
  - Save chats to OpenWebUI as if interacting directly.
  - Read information on the current tab open.
  - Automatically retrieve users own personal API key.
  - Generate images.
  - Pre-fill forms with memory from openwebui.

Hopeful integration:
  - Speech integration
  - Voice integration

