const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const RebillySDK = require('rebilly-js-sdk').default;
const routes = require('./routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const API_SECRET_KEY = process.env.VITE_API_KEY;
const ORGANIZATION_ID = 'gamble-garden';
const WEBSITE_ID = 'www.gamblegarden.com';

const rebilly = RebillySDK({
    organizationId: ORGANIZATION_ID,
    sandbox: true,
    apiKey: API_SECRET_KEY,
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.post('/create-deposit-request', async (req, res) => {
    try {
        const response = await rebilly.depositRequests.create({
            data: {
                websiteId: WEBSITE_ID,
                customerId: 'cus_01JFJ354KEYY3YD4HW4TMV03TG',
                currency: 'USD',
                strategyId: 'dep_str_01JFJ3ABQ23D4EHHMKJ0AEAP4P',
            }
        });

        const token = response.fields.cashierToken;
        res.send({token});
    } catch (error) {
        if (error?.response?.data) {
            console.error(error.response.data);
        } else {
            console.error(error);
        }
        res.status(500).send({error: 'Failed to create deposit request'});
    }
});

routes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.template));
    });
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
