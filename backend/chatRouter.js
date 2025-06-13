const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Ollama } = require('ollama');

const ollama = new Ollama();
const model = 'llama3:latest';

const userChats = {};

function getResponse(prompt, userId) {
    if (!userChats[userId]) {
        userChats[userId] = [
            { role: 'user', content: 'You are an educational assistant trained to help students with a wide range of academic subjects, such as math, science, history, and literature. You are knowledgeable, helpful, and patient.' },
            { role: 'assistant', content: 'Hello! I am your educational assistant. How can I help you with your studies today?' },
            { role: 'user', content: 'Your answers should be clear, concise, and focused on educational topics. If my message is not educational, you should say "I am not able to help you with that."' },
        ];
    }

    userChats[userId].push({ role: 'user', content: prompt });

    return ollama.chat({
        model,
        messages: userChats[userId]
    }).then(response => {
        const botMessage = response.message.content;
        return botMessage;
    });
}

// Middleware to validate JWT and get user ID
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/chat', authenticateToken, async (req, res) => {
    const message = req.body.message?.trim();
    if (!message) return res.status(400).json({ response: 'Please provide a valid message.' });
    console.log(message);
    try {
        const response = await getResponse(message, req.userId);
        res.json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: 'Something went wrong.' });
    }
});

module.exports = router;
