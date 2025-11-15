const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/insights', async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ error: 'توكن غير موجود' });
    }

    try {
        const response = await fetch(`https://graph.instagram.com/me/insights?access_token=${token}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'خطأ في الاتصال بـ Instagram API' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});