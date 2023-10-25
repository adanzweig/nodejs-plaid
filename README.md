
# Bank Transactions Viewer

A simple web application that integrates with the Plaid API to authenticate and fetch bank transactions.

## Overview

This project allows users to link their bank accounts using Plaid's authentication flow. Once authenticated, users can fetch and view their transactions directly on the web page.

## Prerequisites

- Node.js and npm installed.
- A Plaid account with `PLAID_ID` and `PLAID_SECRET` keys.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/adanzweig/nodejs-plaid.git
cd nodejs-plaid
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:

```env
PLAID_ID=your_plaid_id
PLAID_SECRET=your_plaid_secret
```

Replace `your_plaid_id` and `your_plaid_secret` with your actual Plaid API keys.

4. Start the server:

```bash
node server.js
```

## Usage

1. Open `main.html` in your preferred web browser.
2. Click on the "Link Bank account" button to initiate the Plaid authentication flow.
3. Once authenticated, click on the "Get transactions" button to fetch and view your transactions on the page.

## Features

- Link bank accounts using Plaid's secure authentication flow.
- Fetch and view bank transactions.
- Display transactions in a readable format.

## Dependencies

- Express: For setting up the server.
- Plaid: For bank account linking and fetching transactions.
- Cors: For handling cross-origin requests.
- dotenv: For loading environment variables.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
