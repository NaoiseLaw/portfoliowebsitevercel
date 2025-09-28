const express = require('express');
const path = require('path');
const router = express.Router();

// GET route for simulator homepage
router.get('/', (req, res) => {
  try {
    // Serve the simulator HTML file
    res.sendFile(path.join(__dirname, '../public/simulator/index.html'));
  } catch (error) {
    console.error('Error serving simulator page:', error);
    res.status(500).json({ 
      error: 'Failed to load simulator page',
      message: error.message 
    });
  }
});

// POST route for chat functionality
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid message format',
        message: 'Message is required and must be a string' 
      });
    }

    // TODO: Add Google AI integration here
    // This is where you'll add your AI logic
    console.log('Chat message received:', { message, sessionId });
    
    // Placeholder response - replace with actual AI response
    const aiResponse = {
      message: "AI response placeholder - implement your Google AI logic here",
      timestamp: new Date().toISOString(),
      sessionId: sessionId || req.sessionID
    };

    res.json(aiResponse);
    
  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      message: error.message 
    });
  }
});

// GET route for session info (optional)
router.get('/session', (req, res) => {
  try {
    res.json({
      sessionId: req.sessionID,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting session info:', error);
    res.status(500).json({ 
      error: 'Failed to get session info',
      message: error.message 
    });
  }
});

module.exports = router;
