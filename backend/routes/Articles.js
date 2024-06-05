const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Add a new article
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newArticle = new Article({ title, content });
        await newArticle.save();
        res.json(newArticle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
