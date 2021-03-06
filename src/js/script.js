// ======
// INPUTS
// ======
// Create an object which will store the input values
const inputs = {
  bill: 0,
  tip: 0,
  people: 0,
};

// ==========
// BILL INPUT
// ==========
// Store the bill input element in a variable
const inputBill = document.querySelector("#bill");

// Store the bill span element containing the error message
const inputBillInvalidInput = document.querySelector("#input__bill--invalid");

// Add event handler to capture input
function handleInputBill(event) {
  // Extract value from input
  const inputStr = parseFloat(event.currentTarget.value);

  // If the input is not a number, display the the invalid input error message
  if (Number.isNaN(inputStr) && event.currentTarget.value !== "") {
    inputBill.classList.add("input--invalid");
    inputBillInvalidInput.innerText = "Enter a number";
    inputBillInvalidInput.style.display = "inline";
    return;
  }
  // Remove error message otherwise
  // This is here to ensure that when user clears the input, any pre-existing error message is removed
  else {
    clearBillInvalidInput();
  }

  // If input is valid,
  // update the global object bill value and
  // determine if we can compute the tip
  if (inputStr) {
    inputs.bill = inputStr;
    canCompute(inputs);
  }
}

// Add function to clear error message
function clearBillInvalidInput() {
  inputBill.classList.remove("input--invalid");
  inputBillInvalidInput.style.display = "none";
}

// Add function to clear the custom tip input
function clearBill() {
  inputBill.value = "";
  clearBillInvalidInput();
}

// Add event listener to the bill input
inputBill.addEventListener("keyup", handleInputBill);

// ===========
// TIP BUTTONS
// ===========

// Store the tip buttons in a variable
const tipButtons = document.querySelectorAll("button.input__tip-btn");

// Create an function to remove the active state from all buttons
function clearTipActive(buttons) {
  buttons.forEach((button) => {
    button.classList.remove("input__tip-btn--active");
  });

  // Also clear the custom tip button
  clearTipBtn();
}

// Create an event handler function to toggle an active state to the selected button
function handleToggleTipActive(event) {
  // Remove the active class on all tip buttons
  clearTipActive(tipButtons);

  // Add the active class on the buttons which was clicked
  event.currentTarget.classList.add("input__tip-btn--active");
}

// Create an event handler function to extract the tip from each button
function handleBtnTip(event) {
  // Compute the percent of the string selected
  const percentStr = parseInt(event.currentTarget.innerText);
  const percent = percentStr / 100;

  // Update the value of the inputs object tip with percent
  inputs.tip = percent;

  // Determine if output can be computed
  canCompute(inputs);
}

// Add event handlers to all buttons
tipButtons.forEach((button) => {
  button.addEventListener("click", handleToggleTipActive);
  button.addEventListener("click", handleBtnTip);
});

// ================
// CUSTOM TIP INPUT
// ================
// Store the custom tip button in a variable
const tipBtnCustom = document.querySelector("#pCustom");

// Store the custom tip button span error message
const tipBtnCustomInvalidInput = document.querySelector(
  ".input__tip-btn-custom--invalid"
);

// Add event handler to capture custom input
function handleBtnTipCustom(event) {
  // Clear any tip buttons which may be selected
  tipButtons.forEach((button) => {
    button.classList.remove("input__tip-btn--active");
  });

  // Compute the percent of the string selected
  const percentStr = parseFloat(event.currentTarget.value);

  // Remove error message otherwise
  // This is here to ensure that when user clears the input, any pre-existing error message is removed
  if (Number.isNaN(percentStr) && event.currentTarget.value !== "") {
    tipBtnCustom.classList.add("input--invalid");
    tipBtnCustomInvalidInput.innerText = "Enter a number";
    tipBtnCustomInvalidInput.style.display = "inline";
    return;
  }
  // Remove error message otherwise
  // This removes the error message if a use clears the input after entering an invalid input
  else {
    clearTipBtnInvalidInput();
  }

  // Convert percentStr to percent if it is a number
  if (percentStr) {
    const percent = percentStr / 100;

    // Update the value of the inputs object tip with percent
    inputs.tip = percent;

    // Determine if output can be computed
    canCompute(inputs);
  }
}

// Add function to clear error message on custom tip input
function clearTipBtnInvalidInput() {
  tipBtnCustom.classList.remove("input--invalid");
  tipBtnCustomInvalidInput.style.display = "none";
}

// Add function to clear the custom tip input
function clearTipBtn() {
  tipBtnCustom.value = "";
  clearTipBtnInvalidInput();
}

// Add event listener to the custom tip button
tipBtnCustom.addEventListener("keyup", handleBtnTipCustom);

// ======================
// NUMBER OF PEOPLE INPUT
// ======================
// Store the number of people input in a variable
const inputPeople = document.querySelector("#num-people");

// Store the span element containing error message for 0
const inputPeopleInvalidInput = document.querySelector(
  "#input__num-people--invalid"
);

function handleInputPeople(event) {
  const inputStr = parseInt(event.currentTarget.value);

  // Show error message if input is 0
  if (inputStr <= 0) {
    inputPeople.classList.add("input--invalid");
    inputPeopleInvalidInput.innerText = "Can't be <= zero";
    inputPeopleInvalidInput.style.display = "inline";
    return;
  }
  // Show error message if input is not a number
  else if (Number.isNaN(inputStr) && event.currentTarget.value !== "") {
    inputPeople.classList.add("input--invalid");
    inputPeopleInvalidInput.innerText = "Enter a number";
    inputPeopleInvalidInput.style.display = "inline";
    return;
  }
  // Remove error message otherwise
  // This removes the error message if a use clears the input after entering an invalid input
  else {
    clearNumPeopleInvalidInput();
  }

  // If input is valid,
  // update the global object people value and
  // determine if we can compute the tip
  if (inputStr) {
    inputs.people = inputStr;

    // Determine if output can be computed
    canCompute(inputs);
  }
}

// Add function to clear error message from input
function clearNumPeopleInvalidInput() {
  inputPeople.classList.remove("input--invalid");
  inputPeopleInvalidInput.style.display = "none";
}

// Add function to clear the custom tip input
function clearNumPeople() {
  inputPeople.value = "";
  clearNumPeopleInvalidInput();
}

// Add event listener to the bill input
inputPeople.addEventListener("keyup", handleInputPeople);

// ====================================
// TIP AMOUNT / PERSON + TOTAL / PERSON
// ====================================
// Store the tip amount / person output in a variable
const amountTip = document.querySelector("#tip-amount");

// Store the total amount / person output in a variable
const amountTotal = document.querySelector("#total-amount");

// Add event handler function to clear outputs
function clearOutputs() {
  // Reset value of the Tip Amount
  amountTip.innerText = "$0.00";

  // Reset value of the Total Amount
  amountTotal.innerText = "$0.00";
}

// =======
// OUTPUTS
// =======
// Create function that will check if the outputs can be computed
function canCompute(inputs) {
  // Exit function if any value in inputs is 0
  for (const key in inputs) {
    if (inputs[key] === 0) {
      return;
    }
  }

  // Run the computeTip function
  computeTip(inputs);
}

// Create function that will compute the tip
function computeTip(inputs) {
  amountTip.innerText = `$${(
    (((inputs.bill * inputs.tip) / inputs.people) * 100) /
    100
  ).toFixed(2)}`;

  amountTotal.innerText = `$${(
    (((inputs.bill * (1 + inputs.tip)) / inputs.people) * 100) /
    100
  ).toFixed(2)}`;
}

// =====
// RESET
// =====
// Store the reset button in a variable
const resetBtn = document.querySelector(".output__btn");

// Create event handler to reset the tip calculator values
function handleReset() {
  // Reset values of inputs object
  for (const key in inputs) {
    inputs[key] = 0;
  }

  // Reset value of the Bill Input
  clearBill();

  // Remove active state of tip buttons
  clearTipActive(tipButtons);

  // Reset value of the custom tip field
  clearTipBtn();

  // Reset value of the Number of People
  clearNumPeople();

  // Reset Outputs
  clearOutputs();
}

// Add event listener to the resetBtn using the reset() event handler
resetBtn.addEventListener("click", handleReset);

// Run handleReset on page reload to clear the inputs if user reloads the page
window.onload = function () {
  handleReset();
};

// ===================
// TOGGLE COLOR THEMES
// ===================

// Create a function which will toggle the color scheme between light and dark
function toggleColorTheme(event) {
  // Select the HTML DOM element
  const htmlElement = document.querySelector("html");

  // Determine the toggled status of the switch
  const switchStatus = event.currentTarget.checked;

  // Toggle the data-theme
  if (switchStatus) {
    htmlElement.dataset.theme = "dark";
  } else {
    htmlElement.dataset.theme = "light";
  }
}

// Add an event listener to toggle button
document
  .querySelector(".toggle__switch")
  .addEventListener("click", toggleColorTheme);
