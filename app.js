// Selectors
const selectionDropdowns = document.querySelectorAll("select");
const resultHeading = document.querySelector(".result h1");
const calculateButton = document.querySelector(".btn button");
const totalAmountInput = document.querySelector("input");
const fromCurrencySelect = document.querySelector(".from select");
const toCurrencySelect = document.querySelector(".to select");

// Function to set default selection and update flag
const setDefaultSelectionAndFlag = () => {
  // Set default selection for 'from' currency dropdown
  fromCurrencySelect.value = "USD";
  updateFlag(fromCurrencySelect);
  toCurrencySelect.value = "PKR";
  updateFlag(toCurrencySelect);
};

// Populating select dropdowns with currency codes and setting default selection
for (const dropdown of selectionDropdowns) {
  for (const currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    dropdown.append(newOption);
  }
  dropdown.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

// Function to update flag image based on selected currency
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newFlagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let flagImage = element.parentElement.querySelector("img");
  flagImage.src = newFlagSrc;
};

// API request options
const requestOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5667810f67mshaf9c74a75eddddcp15c257jsn3cd5a0258e22",
    "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
  },
};

// Function to fetch currency conversion data from API and append 
async function fetchData() {
  const apiUrl = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurrencySelect.value}&to=${toCurrencySelect.value}&amount=${totalAmountInput.value}`;
  const response = await fetch(apiUrl, requestOptions);
  const responseData = await response.json();
  if (responseData.success) {
    resultHeading.innerText = `Conversion  Rate is :${responseData.info.rate} and Amount is :${responseData.result}`;
  } else {
    resultHeading.innerText = responseData.error.type;
  }
}

// Event listener for button click to calculate currency conversion
calculateButton.addEventListener("click", () => {
  fetchData();
});

// Set default selection and flag
setDefaultSelectionAndFlag();
