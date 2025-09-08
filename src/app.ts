import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));


app.get('/', (req, res) => {
    console.log('health check', new Date().toISOString());
    return res.json({ ok: true, now: new Date().toISOString() })
});


// simple health and demo routes
app.post('/auth/login', (req, res) => {
    // demo login: accept any email, return jwt with sub=userId
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });
    // in real app validate password, fetch user
    const user = { id: email, name: email.split('@')[0] };
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ sub: user.id, name: user.name }, process.env.JWT_SECRET || 'devsecret');
    return res.json({ token, user });
});


export default app;