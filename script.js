// Variable to store the access token
let token;

// Event listener for the "transactions" button click
document.getElementById('transactions').addEventListener('click', function() {
    // Fetch transactions from the server using the stored token
    fetch('http://localhost:3333/get_transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    })
    .then(response => response.json()) // Parse the response to JSON
    .then(data => {
        // Display the transactions in a readable format in the 'transactionsList' element
        document.getElementById('transactionsList').textContent = JSON.stringify(data.transactions, null, 2);
    });
});

// Event listener for the "auth" button click
document.getElementById('auth').addEventListener('click', function() {
    // Fetch a link token from the server
    fetch('http://localhost:3333/create_link_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json()) // Parse the response to JSON
    .then(data => {
        // Extract the link token from the server's response
        const linkToken = data.link_token;

        // Initialize the Plaid link handler with the obtained link token
        const linkHandler = Plaid.create({
            token: linkToken,
            // Callback for successful authentication with Plaid
            onSuccess: function(publicToken, metadata) {
                // Exchange the public token for an access token
                fetch('http://localhost:3333/get_access_token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ publicToken: publicToken })
                })
                .then(response => response.json()) // Parse the response to JSON
                .then(data => {
                    // Store the access token for later use
                    token = data.accessToken;
                });
            },
            // Callback for when the user exits the Plaid authentication flow
            onExit: function(err, metadata) {
                if (err) {
                    // Log any errors that occurred
                    console.error('Error:', err);
                }
            }
        });

        // Open the Plaid authentication flow
        linkHandler.open();
    });
});
