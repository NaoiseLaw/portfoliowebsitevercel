# AI Chat Widget Implementation

## Overview

This implementation adds a floating AI chat widget to naoiselaw.com that allows visitors to interact with an AI assistant powered by Google Gemini. The widget provides information about Naoise's experience, projects, and skills in a conversational format.

## Features

### ✅ Implemented Features

- **Floating Chat Button**: Pulsing blue button in bottom-right corner
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Messaging**: Instant responses powered by Google Gemini API
- **Session Management**: Maintains conversation context across messages
- **Rate Limiting**: Prevents abuse with 10 requests per minute per IP
- **Smart Suggestions**: Context-aware suggestion chips
- **Mobile Optimized**: Full-width on mobile, swipe-friendly interface
- **Keyboard Shortcuts**: Enter to send, Escape to close
- **Auto-resize Input**: Textarea grows with content
- **Typing Indicators**: Visual feedback during AI responses
- **Error Handling**: Graceful error messages and retry options

### 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Theme Integration**: Matches your site's design system
- **Smooth Animations**: Slide-in effects and hover states
- **Loading States**: Visual feedback during API calls
- **Character Counter**: 500 character limit with visual indicator

## File Structure

```
src/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts          # Chat API endpoint
├── components/
│   └── chat-widget.tsx          # React chat widget component
└── app/
    └── layout.tsx               # Updated to include chat widget
```

## API Endpoint

### POST `/api/chat`

**Request Body:**
```json
{
  "message": "Tell me about your AI experience",
  "sessionId": "uuid-v4-session-id",
  "history": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant", 
      "content": "Hi! I'm Naoise's AI assistant..."
    }
  ]
}
```

**Response:**
```json
{
  "response": "I have extensive experience in AI...",
  "sessionId": "uuid-v4-session-id",
  "timestamp": "2025-01-03T10:30:00Z",
  "suggestions": [
    "Tell me about your leadership experience",
    "What projects have you worked on?"
  ]
}
```

## Configuration

### Environment Variables

Make sure you have the following environment variables set:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
# OR
GOOGLE_AI_API_KEY=your_gemini_api_key_here
```

### Rate Limiting

- **Limit**: 10 requests per minute per IP address
- **Window**: 60 seconds
- **Storage**: In-memory (use Redis for production)

### Session Management

- **Session Timeout**: 30 minutes of inactivity
- **Message Limit**: 20 exchanges per session
- **Storage**: In-memory (use Redis for production)

## Usage

### Basic Usage

The chat widget is automatically included on all pages via the layout component:

```tsx
// In src/app/layout.tsx
import ChatWidget from "@/components/chat-widget";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* Your existing content */}
        <ChatWidget />
      </body>
    </html>
  );
}
```

### Customization

You can customize the chat widget by passing props:

```tsx
<ChatWidget className="custom-chat-styles" />
```

## Mobile Responsiveness

### Desktop (>768px)
- Fixed width: 400px
- Height: 600px
- Position: Bottom-right corner
- Minimize functionality available

### Mobile (<768px)
- Width: 85% of viewport
- Height: 70% of viewport
- Full-width interface
- Touch-optimized buttons
- No minimize button

## Testing

### Manual Testing

1. **Open the website** - Chat button should appear in bottom-right
2. **Click the button** - Chat window should slide in smoothly
3. **Send a message** - Should receive AI response
4. **Test suggestions** - Click suggestion chips to auto-fill input
5. **Test mobile** - Resize browser to test mobile layout
6. **Test keyboard** - Enter to send, Escape to close

### Automated Testing

Run the test script:

```bash
node test-chat-widget.js
```

This will test:
- Basic message sending
- Rate limiting
- Input validation
- Error handling

## Performance

### Optimizations

- **Lazy Loading**: Widget only loads when needed
- **Session Cleanup**: Automatic cleanup of old sessions
- **Efficient Rendering**: React optimizations for smooth UI
- **Minimal Bundle**: Only essential dependencies

### Monitoring

- **API Calls**: Logged to console in development
- **Error Tracking**: Comprehensive error handling
- **Session Tracking**: Automatic session management

## Security

### Input Validation

- **Message Length**: Maximum 500 characters
- **Content Sanitization**: XSS protection
- **Rate Limiting**: Prevents abuse
- **Session Validation**: Secure session handling

### API Security

- **Environment Variables**: API keys stored securely
- **CORS Protection**: Origin validation in production
- **Input Sanitization**: All inputs validated and sanitized

## Troubleshooting

### Common Issues

1. **Chat button not appearing**
   - Check if ChatWidget is imported in layout.tsx
   - Verify no JavaScript errors in console

2. **API not responding**
   - Check GOOGLE_API_KEY environment variable
   - Verify API endpoint is accessible
   - Check rate limiting

3. **Mobile layout issues**
   - Test on actual mobile device
   - Check viewport meta tag
   - Verify responsive classes

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

This will show detailed logs in the console.

## Future Enhancements

### Phase 2 Features

- [ ] Voice input support
- [ ] File upload capability
- [ ] Persistent chat history
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Admin dashboard

### Performance Improvements

- [ ] Redis session storage
- [ ] CDN for static assets
- [ ] Service worker caching
- [ ] WebSocket for real-time updates

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review the console for errors
3. Test with the provided test script
4. Check environment variables

## License

This implementation is part of the naoiselaw.com portfolio and follows the same license terms.
