const createStocks = () => {
  let stockList = [];
  const saveStocks = (stocks) => {
    //clear list;
    stockList.splice(0, stockList.length);
    for (const stock of stocks) {
      stockList.push(stock);
    }
  };
  const getStocks = () => {
    return structuredClone(stockList);
  };

  return { saveStocks, getStocks };
};
const stockModel = createStocks();
export default stockModel;
