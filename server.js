// Import required modules
const express = require('express');
const plaid = require('plaid');
const cors = require('cors');
require('dotenv').config() // Load environment variables from a .env file

// Initialize an Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use express.json middleware to parse incoming JSON requests
app.use(express.json());

// Set port number for the server
const port = 3333;

// Initialize Plaid client with configuration
const client = new plaid.PlaidApi(
    new plaid.Configuration({
        // Use sandbox environment for Plaid
        basePath: plaid.PlaidEnvironments['sandbox'],
        baseOptions:{
            headers:{
                // Set Plaid client ID, secret, and version from environment variables
                "PLAID-CLIENT-ID": process.env.PLAID_ID,
                "PLAID-SECRET": process.env.PLAID_SECRET,
                "Plaid-Version": "2020-09-14"
            }
        }
    })
);

// Endpoint to create a link token
app.post('/create_link_token', async (req, res) => {
    try {
        const response = await client.linkTokenCreate({
            user: {
                client_user_id: 'CodingWithAdo'
            },
            client_name: 'Ado',
            products: ['transactions'],
            required_if_supported_products: ['auth'],
            country_codes: ['us'],
            language: "en"
        });
        // Send the response data as JSON
        res.json(response.data);
    } catch (error) {
        console.error('Error', error);
        // Send error message as JSON
        res.json({
            error: error.message
        });
    }
});

// Endpoint to exchange a public token for an access token
app.post('/get_access_token', async (req, res) => {
    try {
        const publicToken = req.body.publicToken;
        const response = await client.itemPublicTokenExchange({
            public_token: publicToken
        });
        // Send the access token as JSON
        res.json({ accessToken: response.data.access_token });
    } catch (error) {
        console.error('Error', error);
        // Send error message as JSON
        res.json({
            error: error.message
        });
    }
});

// Endpoint to get transactions using an access token
app.post('/get_transactions', async (req, res) => {
    try {
        const response = await client.transactionsGet({
            access_token: req.body.token,
            start_date: '2023-01-01',
            end_date: '2023-12-31',
            options: {
                offset: 0
            }
        });
        // Send the transactions data as JSON
        res.json(response.data);
    } catch (error) {
        console.error('Error', error);
        // Send error message as JSON
        res.json({
            error: error.message
        });
    }
});

// Start the server on the specified port
app.listen(port);
