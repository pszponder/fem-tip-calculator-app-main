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

// ===========
// TIP BUTTONS
// ===========
// Store the tip buttons in a variable
const tipButtons = document.querySelectorAll("button.input__tip-btn");
const tipBtn05 = document.querySelector("#p05");
const tipBtn10 = document.querySelector("#p10");
const tipBtn15 = document.querySelector("#p15");
const tipBtn25 = document.querySelector("#p25");
const tipBtn50 = document.querySelector("#p50");

// Create an event handler function to remove the active state from all buttons
function handleRemoveTipActive(buttons) {
  // Remove active state class from each button in buttons
  buttons.forEach((button) => {
    button.classList.remove("input__tip-btn--active");
  });
}

// Create an event handler function to toggle an active state to the selected button
function handleToggleTipActive(event) {
  // Remove the active class on all tip buttons
  handleRemoveTipActive(tipButtons);

  // Add the active class on the buttons which was clicked
  event.currentTarget.classList.add("input__tip-btn--active");
}

// Create an event handler function to extract the tip from each button
function handleBtnTip(event) {
  // Compute the percent of the string selected
  const percentStr = parseInt(event.currentTarget.innerText);
  const percent = parseInt(percentStr) / 100;

  // Update the value of the inputs object tip with percent
  inputs.tip = percent;
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

// ======================
// NUMBER OF PEOPLE INPUT
// ======================
// Store the number of people input in a variable
const inputPeople = document.querySelector("#num-people");

// =======
// OUTPUTS
// =======

// ===================
// TIP AMOUNT / PERSON
// ===================
// Store the tip amount / person output in a variable
const amountTip = document.querySelector("#tip-amount");

// ==============
// TOTAL / PERSON
// ==============
// Store the total amount / person output in a variable
const amountTotal = document.querySelector("#total-amount");

// ============
// RESET BUTTON
// ============
// Store the reset button in a variable
const resetBtn = document.querySelector(".output__btn");

// Create event handler to reset the tip calculator values
function handleReset() {
  // Reset values of inputs object
  for (const key in inputs) {
    inputs[key] = 0;
  }

  // Reset value of the Bill Input
  inputBill.value = "";

  // Remove active state of tip buttons
  handleRemoveTipActive(tipButtons);

  // Reset value of the custom tip field
  tipBtnCustom.value = "";

  // Reset value of the Number of People
  inputPeople.value = "";

  // Reset value of the Tip Amount
  amountTip.innerText = "$0.00";

  // Reset value of the Total Amount
  amountTotal.innerText = "$0.00";
}

// Add event listener to the resetBtn using the reset() event handler
resetBtn.addEventListener("click", handleReset);

// Add an event handler to add a styling class to tip buttons

// Add an event handler which takes the value of the selected tip button and uses it to compute the tip

// Add event listeners to all tip buttons using the styling event handler

/*
Bill = $142.55
Tip = 15%
Number of People = 5
Tip Amount / Person = $4.27
Total Amount / Person = $32.79

Total Amount = Bill * (1 + tip) / numPeople
Tip Amount = (Bill * tip ) / numPeople
*/
