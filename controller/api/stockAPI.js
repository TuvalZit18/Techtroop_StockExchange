const apiKey = `KdT72mbBSOL9btWfvOe1AgtUKot4cN4M`;
const stockAPI = {
  getStocksByName: async (symbol) => {
    const response = await fetch(
      `https://financialmodelingprep.com/stable/search-name?query=${symbol}&limit=5&apikey=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch stocks by symbol");
    }

    const data = await response.json();

    return data;
  },
  getStocksBySymbol: async (name) => {
    const response = await fetch(
      `https://financialmodelingprep.com/stable/search-symbol?query=${name}&limit=5&apikey=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch stocks by name");
    }

    const data = await response.json();

    return data;
  },
};
export default stockAPI;
