export const renderStockList = (stocks) => {
  const content = document.querySelector(".stocks-content");

  content.innerHTML = "";
  for (const stock of stocks) {
    const div = document.createElement("div");
    const link = document.createElement("a");
    link.textContent = `${stock.name} (${stock.symbol})`;
    link.href = "../company/index.html" + `?symbol=${stock.symbol}`;
    div.appendChild(link);
    content.appendChild(div);
  }
};
export const clearStockList = () => {
  const content = document.querySelector(".stocks-content");
  content.innerHTML = "";
};
export const renderSpinner = (isPending) => {
  const spinner = document.querySelector("stock-spinner");
  spinner.style.display = isPending ? "inline-block" : "none";
};
