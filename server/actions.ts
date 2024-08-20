"use server";

// capitalize the first letter of a string
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Get the price history of a token
export async function getTokenHistory(coinId: string, startDate: Date, endDate: Date) {
  // Convert the start and end dates to Unix timestamps
  const start = new Date(startDate).getTime() / 1000;
  const end = new Date(endDate).getTime() / 1000;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}/market_chart/range?vs_currency=usd&from=${start}&to=${end}`
    );
    const data = await response.json();
    return { success: true, data };
  }
  catch (error: any) {
    console.error('Failed to get token history:', error);
    return { success: false, error: error.message };
  }
}

// Get the list of available coin IDs from the CoinGecko API
export async function getCoinIDs(){
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/list`
    );
    const data = await response.json();

    // return the list of coin IDs
    const coinIDs = data.map((coin: any) => capitalizeFirstLetter(coin.id));

    return { success: true, coinIDs };
  }
  catch (error: any) {
    console.error('Failed to get coin IDs:', error);
    return { success: false, error: error.message };
  }
}