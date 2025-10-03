# Portfolio Simulator Setup

## Google AI API Key Setup

The 3D Portfolio Simulator uses Google's Gemini AI for intelligent conversations. To enable the full AI functionality:

### 1. Get Your Google AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Add Environment Variable

Create a `.env.local` file in your project root with:

```bash
# Google AI API Key for Portfolio Simulator
GOOGLE_API_KEY=your_actual_api_key_here

# Alternative environment variable name (for flexibility)
GOOGLE_AI_API_KEY=your_actual_api_key_here

# Site URL for production origin checking (optional)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Restart Development Server

After adding the environment variable:

```bash
npm run dev
```

## Features

### With API Key (Full Functionality)
- ✅ Real AI conversations using Google Gemini 2.0 Flash
- ✅ Context-aware responses based on your portfolio data
- ✅ Persistent conversation history
- ✅ Multiple AI personas (Technical PM, Product Leader, Innovation Designer)
- ✅ Rate limiting and security features

### Without API Key (Fallback Mode)
- ✅ Basic 3D environment with floating cubes
- ✅ Simulated AI responses based on keywords
- ✅ Chat interface with local storage
- ❌ No real AI integration
- ❌ No context-aware responses

## Troubleshooting

### "Server misconfiguration: missing GOOGLE_API_KEY"
- Make sure you've created `.env.local` with your API key
- Restart your development server
- Check that the API key is valid and active

### API Rate Limits
- The simulator includes built-in rate limiting (10 requests per minute per IP)
- If you hit limits, wait a minute before trying again

### CORS Issues
- The API includes origin checking for production
- Make sure `NEXT_PUBLIC_SITE_URL` matches your domain in production

## Security Notes

- Never commit your `.env.local` file to version control
- The API key is only used server-side for security
- Rate limiting prevents abuse
- Origin checking prevents unauthorized usage in production