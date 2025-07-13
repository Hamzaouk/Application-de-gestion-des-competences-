const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Config: URLs of your microservices
const BRIEF_SERVICE_URL = 'http://localhost:5000';
const COMPETENCE_SERVICE_URL = 'http://localhost:8000';

// Proxy /api/briefs requests to Brief-Service
app.use('/api/briefs', async (req, res, next) => {
    if (req.path.match(/^\/\w+\/full$/)) return next(); // Let /api/briefs/:id/full fall through
    const url = `${BRIEF_SERVICE_URL}/api/briefs${req.url}`;
    try {
        const response = await axios({
            method: req.method,
            url,
            data: req.body,
            headers: req.headers,
            params: req.query,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Gateway error', error: error.message });
        }
    }
});

// Proxy /api/competences requests to Competence-Service
app.use('/api/competences', async (req, res) => {
    const url = `${COMPETENCE_SERVICE_URL}/api/competences${req.url}`;
    try {
        const response = await axios({
            method: req.method,
            url,
            data: req.body,
            headers: req.headers,
            params: req.query,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Gateway error', error: error.message });
        }
    }
});

// Combined endpoint: GET /api/briefs/:id/full
app.get('/api/briefs/:id/full', async (req, res) => {
    try {
        // 1. Get the brief from Brief-Service
        const briefRes = await axios.get(`${BRIEF_SERVICE_URL}/api/briefs/${req.params.id}`);
        const brief = briefRes.data;
        // 2. Get competence details from Competence-Service
        if (!brief.competences || brief.competences.length === 0) {
            return res.json({ ...brief, competencesDetails: [] });
        }
        // Assume Competence-Service supports ?ids=... query
        const ids = brief.competences.map(id => typeof id === 'object' && id._id ? id._id : id).join(',');
        const compRes = await axios.get(`${COMPETENCE_SERVICE_URL}/api/competences`, { params: { ids } });
        res.json({ ...brief, competencesDetails: compRes.data });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Gateway error', error: error.message });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`)); 