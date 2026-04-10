// 🔹 API Key aur Base URL sabse upar define karo
const API_KEY = "cur_live_Mja8HBR90EbKhdz8ymLZMq17b0bLl6WjxtUbJDgN"; 
const BASE_URL = "v3/latest?apikey=cur_live_Mja8HBR90EbKhdz8ymLZMq17b0bLl6WjxtUbJDgN";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// 🔹 Currency list (aapke countryList object se)
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode; 
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// 🔹 Flag Update Function
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// 🔹 Exchange Rate Fetch Function
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // API call
  const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurr.value}`;
  console.log("Fetching:", URL);

  try {
    let response = await fetch(URL);
    let data = await response.json();
    console.log("API Response:", data);

    // CurrencyAPI response me "data" object ke andar rates milte hain
    let rate = data.data[toCurr.value].value;
    let finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching rates:", error);
    msg.innerText = "API se data fetch nahi ho raha.";
  }
};

// 🔹 Button aur Window Events
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});



