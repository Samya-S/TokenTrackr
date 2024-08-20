# TokenTrackr

## Overview
TokenTrackr, a Crypto-Portfolio app, is a single-page application (SPA) that allows users to manage their cryptocurrency tokens. It provides functionalities such as adding tokens to a watch list, viewing current and historical balances, checking token allowances, and performing token transfers. The app integrates with blockchain technology to provide real-time data and interact with smart contracts.

## Features

1. **Wallet Connection**
   - Users can connect their Metamask wallet or input a wallet address manually.

2. **Watch List**
   - Users can add tokens to a watch list and view the current balance, price and other details for each token.

3. **Historical Data**
   - Users can fetch and display the historical balance of any token with a date picker for date range selection.

4. **Allowance**
   - User can check token allowances for different smart contracts.

5. **Token Allow/Transfer**
   - User can allow or transfer tokens to another address with fields for recipient address and amount.

6. **Visual Representations**
   - Utilized tables and charts to display token balances and historical data.

## Technical Stack

- **Frontend**: `React.js` with `Next.js`
- **Blockchain Interaction**: `Ethers.js` with `Metamask`

## External APIs

- **CoinGecko**: Used to fetch token history in the application. Also provides other cryptocurrency data like market capitalization, and trading volume. For details please refer [CoinGecko API Documentation](https://coingecko.com/en/api)

- **CryptoCompare**: Used to fetch cryptocurrency prices in the application. Also offers data on historical data, and market trends. For details please refer [CryptoCompare API Documentation](https://min-api.cryptocompare.com/documentation)


## Important Packages

- **@metamask/sdk-react**: `^0.11.2` - For Metamask integration.
- **ethers**: `^6.0.0` - For interacting with the Ethereum blockchain.
- **react-datepicker**: `^7.3.0` - For date selection in historical data.
- **recharts**: `^2.12.7` - For charts and graphical representations.
- **react-toastify**: `^10.0.5` - For notifications.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Samya-S/TokenTrackr.git
   cd TokenTrackr
   ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Environment Variables**

    Create a `.env.local` file in the root directory and add the following environment variables.

    ```bash
    INFURA_API_KEY=your_infura_api_key
    ```

4. **Run the Application**

    ```bash
    npm run dev
    ```

    Open your browser and go to http://localhost:3000 to view the application.

## Usage

- **Connect Wallet**: Click on the button to connect Metamask or input a wallet address.
- **Add Tokens**: Use the watch list feature to add and manage tokens.
- **View Balances**: Check current and historical token balances.
- **Check Allowance**: Verify token allowances for smart contracts.
- **Transfer Tokens**: Enter recipient address and amount to transfer tokens.

## Visual Representations

The app includes various visual elements:

- **Tables**: Display token balances, price and other data.
- **Charts**: Represent historical data of tokens for dynamic time frame.

## Deployment

The application is deployed on Netlify (or another hosting service). You can access the live demo here: https://tokentrackr.vercel.app.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## References

- [Ethers.js Documentation](https://docs.ethers.io/v5/)
- [Next.js Documentation](https://nextjs.org/docs)
