import { getCoinIDs, getTokenHistory } from "@/server/actions";
import PriceChart from "../components/PriceChart";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  bitcoinPriceHistory  from "../data/bitcoinPriceHistory";

export interface PriceData {
  prices: [number, number][];
}

const TokenHistory: React.FC = () => {
  // select the token state for fetching the token history
  const [tokenID, setTokenID] = useState<string>("Bitcoin");

  const [tokens, setTokens] = useState<string[]>([]);

  // Fetch the list of available token IDs
  useEffect(() => {
    getCoinIDs().then((response) => {
      if (response.success) {
        setTokens(response.coinIDs);
      } else {
        console.error("Failed to get coin IDs:", response.error);
        alert("Failed to get coin IDs! Check your internet connection.");
      }
    });
  }, []);

  const [filteredTokens, setFilteredTokens] = useState<string[]>([]);

  const handleTokenIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTokenID(value);
    setFilteredTokens(
      tokens.filter((token) =>
        token.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleTokenSelect = (token: string) => {
    setTokenID(token);
    setFilteredTokens([]);
  };

  // select the date range for fetching the token history
  const [fromDate, setFromDate] = useState<Date | null>(new Date("2024-01-01"));
  const [toDate, setToDate] = useState<Date | null>(new Date("2024-08-01"));

  // state to store the token history data (initial data is set to a sample data)
  const [data, setData] = useState<PriceData>(bitcoinPriceHistory);

  // Fetch the token history data using the tokenID, fromDate and toDate
  useEffect(() => {
    if (!fromDate || !toDate) return;
    getTokenHistory(tokenID, fromDate, toDate).then((response) => {
      if (response.success && Array.isArray(response.data.prices)) {
        setData(response.data);
      } else {
        console.error("Failed to get token history:", response.error);
        alert("Failed to get token history! Check your internet connection.");
      }
    });
  }, [fromDate, toDate, tokenID]);

  return (
    <div className="pb-5">
      <p className="text-2xl font-medium text-center pb-5">
        Historical Token Prices
      </p>

      {/* Dropdown for selecting the token */}
      <div className="flex justify-center text-lg pb-5">
        <p>
          Token:
          <span>
            <input
              type="text"
              value={tokenID}
              onChange={handleTokenIdInputChange}
              className="ml-2 border border-gray-300 rounded px-2 py-1 w-36 text-left"
              placeholder="Search token"
            />
            {filteredTokens.length > 0 && (
              <ul className="absolute z-10 ml-[3.65rem] border border-gray-300 bg-white rounded mt-1 w-36">
                {filteredTokens.map((token) => (
                  <li
                    key={token}
                    onClick={() => handleTokenSelect(token)}
                    className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                  >
                    {token}
                  </li>
                ))}
              </ul>
            )}
          </span>
        </p>
      </div>

      {/* Date picker for selecting the date range */}
      <div className="flex justify-center gap-10 pb-5">
        <label>
          From:
          <DatePicker
            selected={fromDate}
            onChange={(date: Date | null) => setFromDate(date)}
            dateFormat="dd/MM/yy"
            className="ml-2 border border-gray-300 rounded px-2 py-1 w-28 text-center"
          />
        </label>
        <label>
          To:
          <DatePicker
            selected={toDate}
            onChange={(date: Date | null) => setToDate(date)}
            dateFormat="dd/MM/yy"
            className="ml-2 border border-gray-300 rounded px-2 py-1 w-28 text-center"
          />
        </label>
      </div>

      {/* Graphical representation of the token price history */}
      <PriceChart data={data} />
    </div>
  );
};

export default TokenHistory;
