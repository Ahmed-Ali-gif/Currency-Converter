const amountInput = document.querySelector("#amount");
const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");
const convertBtn = document.querySelector("#convertBtn");
const resultBox = document.querySelector("#result");
const swapBtn = document.querySelector("#swapBtn");

// Convert Currency
async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || amount <= 0) {
    resultBox.innerHTML = " Please enter valid amount";
    return;
  }
  try {
    resultBox.innerHTML = "Converting...";

    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);

    const data = await response.json();
console.log(data.rates[to]);

    const rate = data.rates[to];

    const convertedAmount = (amount * rate).toFixed(2);

    resultBox.innerHTML = `
      ${amount} ${from} = ${convertedAmount} ${to}
    `;
  } catch (error) {
    resultBox.innerHTML = "Something went wrong";
    console.log(error);
  }
}

convertBtn.addEventListener("click", convertCurrency);
swapBtn.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;

  toCurrency.value = temp;
});
