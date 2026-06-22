import stockModel from "../model/stock.js";
import {
  clearStockList,
  renderSpinner,
  renderStockList,
} from "../view/pages/main/render.js";
import stockAPI from "./api/stockAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

const init = () => {
  bindEvents();
};

const bindEvents = () => {
  document.addEventListener("click", (e) => {
    const action = e.target.closest("[data-action]")?.dataset.action;

    if (!action) return;

    switch (action) {
      case "search":
        const query = document.getElementById("inputSearch").value;
        handleSearch(query);
    }
  });
};

const handleSearch = async (query) => {
  try {
    clearStockList();
    renderSpinner(true);
    // const [symbols, names] = await Promise.all([
    //   stockAPI.getStocksByName(query),
    //   stockAPI.getStocksBySymbol(query),
    // ]);
    const symbols = [
      {
        symbol: "AA",
        name: "Alcoa Corporation",
        currency: "USD",
        exchangeFullName: "New York Stock Exchange",
        exchange: "NYSE",
      },
      {
        symbol: "AAL",
        name: "American Airlines Group Inc.",
        currency: "USD",
        exchangeFullName: "NASDAQ Global Select",
        exchange: "NASDAQ",
      },
      {
        symbol: "AAA",
        name: "Alternative Access First Priority CLO Bond ETF",
        currency: "USD",
        exchangeFullName: "New York Stock Exchange Arca",
        exchange: "AMEX",
      },
      {
        symbol: "AAN",
        name: "The Aaron's Company, Inc.",
        currency: "USD",
        exchangeFullName: "New York Stock Exchange",
        exchange: "NYSE",
      },
      {
        symbol: "AAP",
        name: "Advance Auto Parts, Inc.",
        currency: "USD",
        exchangeFullName: "New York Stock Exchange",
        exchange: "NYSE",
      },
    ];
    const names = [
      {
        symbol: "AAGUSD",
        name: "AAG USD",
        currency: "USD",
        exchangeFullName: "CCC",
        exchange: "CRYPTO",
      },
      {
        symbol: "AAVEUSD",
        name: "Aave USD",
        currency: "USD",
        exchangeFullName: "CCC",
        exchange: "CRYPTO",
      },
      {
        symbol: "AIR",
        name: "AAR Corp.",
        currency: "USD",
        exchangeFullName: "New York Stock Exchange",
        exchange: "NYSE",
      },
      {
        symbol: "AAPJ",
        name: "AAP, Inc.",
        currency: "USD",
        exchangeFullName: "Other OTC",
        exchange: "OTC",
      },
      {
        symbol: "AAON",
        name: "AAON, Inc.",
        currency: "USD",
        exchangeFullName: "NASDAQ Global Select",
        exchange: "NASDAQ",
      },
    ];
    const joinedStocks = Array.from(
      new Map(
        [...symbols, ...names].map((stock) => [stock.symbol, stock]),
      ).values(),
    ).sort((a, b) => b.name.localeCompare(a.name));
    stockModel.saveStocks(joinedStocks);
    setTimeout(() => {
      renderStockList(joinedStocks);
    }, 1000);
  } catch (error) {
    console.error("Error searching stocks:", error);
  } finally {
    setTimeout(() => {
      renderSpinner(false);
    }, 1000);
  }
};
