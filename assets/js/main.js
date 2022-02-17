document.getElementById('calculate-btn').addEventListener('click', handleCalculateBtn);

document.getElementById("saving-btn").addEventListener('click', handleSavingBtn);

// Event Handler for calculate button
function handleCalculateBtn() {
    // remaining balance after expenses
    const finalBalance = calcTotalBalance();

    // updating balance value
    if (!finalBalance) {
        updatePreviousValue("total-balance-field", 0);
    } else {
        updatePreviousValue("total-balance-field", finalBalance);
    }
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
    let errorDisplay = document.getElementById(ID).parentElement.nextElementSibling;

    if (isNaN(inputValue) || inputValue < 0) {
        if (isNaN(inputValue)) {
            errorDisplay.innerHTML = "enter a number value.";
            errorDisplay.style.display = "block";
        } else if (inputValue < 0) {
            errorDisplay.innerHTML = "enter a positive number.";
            errorDisplay.style.display = "block";
        }
        return false;
    }
    errorDisplay.style.display = "none";
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
    if (incomeAmount && foodExpenseAmount && rentExpenseAmount && clothExpenseAmount) {
        // calculating total expense
        const totalExpense = updateTotalExpense(foodExpenseAmount, rentExpenseAmount, clothExpenseAmount);

        const finalBalance = incomeAmount - totalExpense;
        console.log('loop');
        return finalBalance;
    }
    updatePreviousValue("total-expense-field", 0);
    return false;
}

// to calculate total expenses and update the value
function updateTotalExpense(foodExpense, rentExepnse, colthExpense) {
    const totalExpense = foodExpense + rentExepnse + colthExpense;
    updatePreviousValue("total-expense-field", totalExpense);
    return totalExpense;
}

// to calculate and update percentage value
function calcSavings(percentage) {
    const balanceAfterExpense = calcTotalBalance();
    const incomeAmount = getInputValue("income-input-field");
    const savingAmount = (incomeAmount * percentage) / 100;
    const remainingBalance = balanceAfterExpense - savingAmount;

    // updating values
    updatePreviousValue("saving-amount", savingAmount);
    updatePreviousValue("remaining-amount", remainingBalance);
}