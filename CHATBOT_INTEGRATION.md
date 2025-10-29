# Chatbot Integration Guide

## Overview
A modern chatbot widget has been added to your portfolio website with webhook support for AI agent integration.

## Features
- ✅ Modern, responsive design
- ✅ Dark mode support
- ✅ Mobile-friendly interface
- ✅ Webhook integration ready
- ✅ Chat history persistence
- ✅ Typing indicators
- ✅ Smooth animations
- ✅ Notification dot

## Chatbot Location
The chatbot appears as a floating button in the bottom-right corner of the website.

## How to Connect Your AI Agent

### 1. Set up your AI agent webhook
Create an endpoint that accepts POST requests with the following payload:
```json
{
  "message": "User's message",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "userAgent": "Browser info",
  "url": "Current page URL"
}
```

### 2. Configure the webhook
Once your AI agent is ready, call this function in the browser console or add it to your code:
```javascript
setChatbotWebhook('https://your-ai-agent-url.com/webhook');
```

### 3. Expected Response Format
Your AI agent should return one of these response formats:
```json
// Option 1: Simple string
"Hello! How can I help you?"

// Option 2: Object with message property
{
  "message": "Hello! How can I help you?"
}

// Option 3: Object with response property
{
  "response": "Hello! How can I help you?"
}

// Option 4: Object with text property
{
  "text": "Hello! How can I help you?"
}
```

## Available Functions

### `setChatbotWebhook(url)`
Sets the webhook URL for your AI agent.

### `clearChatHistory()`
Clears the chat history and shows a welcome message.

### `showChatbotNotification()`
Shows the notification dot on the chatbot button.

## Styling
The chatbot uses the same design system as your portfolio:
- Blue gradient theme (#3b82f6 to #1d4ed8)
- Inter font family
- Smooth animations and transitions
- Responsive design for mobile devices

## Dark Mode
The chatbot automatically adapts to your website's dark mode setting.

## Mobile Support
On mobile devices, the chatbot window expands to use most of the screen for better usability.

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Responsive design for all screen sizes

## Testing
1. Open your portfolio website
2. Click the chatbot button in the bottom-right corner
3. Type a message and press Enter or click Send
4. The chatbot will show a default message until you connect your AI agent

## Troubleshooting
- If the chatbot doesn't appear, check the browser console for errors
- Make sure all required HTML elements are present
- Verify that the CSS and JavaScript files are loaded correctly
- Check that the webhook URL is accessible and returns the expected format

## Customization
You can customize the chatbot by modifying the CSS classes in `assets/css/styles.css`:
- `.chatbot-widget` - Main container
- `.chatbot-window` - Chat window
- `.chatbot-message` - Individual messages
- `.chatbot-input` - Input field

## Support
For any issues or questions about the chatbot integration, contact Karim at Karim00el@gmail.com.

