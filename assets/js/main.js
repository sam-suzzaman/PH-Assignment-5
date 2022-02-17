document.getElementById('calculate-btn').addEventListener('click', handleCalculateBtn);

document.getElementById("saving-btn").addEventListener('click', handleSavingBtn);

// Event Handler for calculate button
function handleCalculateBtn() {
    // remaining balance after expenses
    const finalBalance = calcTotalBalance();
    // updating balance value
    updatePreviousValue("total-balance-field", finalBalance);

}

// Event Handler for save button
function handleSavingBtn() {
    const savingPercentage = getInputValue("saving-percentage");
    calcSavings(savingPercentage);
}

// template function to get input's value ======
function getInputValue(ID) {
    const inputField = document.getElementById(ID);
    const inputValue = parseInt(inputField.value);
    // inputField.value = '';
    return inputValue;
}

// template function to update html value ======
function updatePreviousValue(ID, value) {
    const prevValueField = document.getElementById(ID);
    prevValueField.innerHTML = value;
}

// to calculate final total Balance
function calcTotalBalance() {
    const incomeAmount = getInputValue("income-input-field");
    const foodExpenseAmount = getInputValue("food-input-field");
    const rentExpenseAmount = getInputValue("rent-input-field");
    const clothExpenseAmount = getInputValue("cloth-input-field");

    // calculating total expense
    const totalExpense = updateTotalExpense(foodExpenseAmount, rentExpenseAmount, clothExpenseAmount);

    const finalBalance = incomeAmount - totalExpense;

    return finalBalance;
}

// to calculate total expenses and update the value
function updateTotalExpense(foodExpense, rentExepnse, colthExpense) {
    const totalExpense = foodExpense + rentExepnse + colthExpense;
    updatePreviousValue("total-expense-field", totalExpense);
    return totalExpense;
}

// to calculate and update percentage value
function calcSavings(percentage) {
    const incomeBalance = calcTotalBalance();
    const savingAmount = (incomeBalance * percentage) / 100;
    const remainingBalance = incomeBalance - savingAmount;

    // updating values
    updatePreviousValue("saving-amount", savingAmount);
    updatePreviousValue("remaining-amount", remainingBalance);
}