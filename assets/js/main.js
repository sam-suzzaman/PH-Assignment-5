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
    const error = document.getElementById("percentage-error-message");
    if (savingPercentage === "showError") {
        error.innerHTML = "Enter a number value";
        error.style.display = 'block';
    } else {
        error.style.display = "none";
        calcSavings(savingPercentage);
    }
    console.log(savingPercentage);

}

// template function to get input's value ======
function getInputValue(ID) {
    const inputField = document.getElementById(ID);
    const inputValue = parseInt(inputField.value);
    let errorDisplay = document.getElementById(ID).parentElement.nextElementSibling;


    if (isNaN(inputValue) || inputValue < 0) {
        if (ID == "saving-percentage") {
            return "showError";
        } else {
            if (isNaN(inputValue)) {
                errorDisplay.innerHTML = "enter a number value.";
                errorDisplay.style.display = "block";
                console.log('clicked');
            } else if (inputValue < 0) {
                errorDisplay.innerHTML = "enter a positive number.";
                errorDisplay.style.display = "block";
            }

            return false;
        }
    }
    if (ID !== "saving-percentage") {
        errorDisplay.style.display = "none";
    }
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

        // checking
        const errorMessage = document.getElementById("expense-error-message");
        if (finalBalance < 0) {
            errorMessage.innerHTML = "insufficient balance";
            errorMessage.style.display = 'block';
            updatePreviousValue("total-expense-field", totalExpense);
        } else {
            errorMessage.style.display = 'none';
            updatePreviousValue("total-expense-field", totalExpense);
        }
        return finalBalance;
    }

    return false;
}

// to calculate total expenses and update the value
function updateTotalExpense(foodExpense, rentExepnse, colthExpense) {
    const totalExpense = foodExpense + rentExepnse + colthExpense;
    // updatePreviousValue("total-expense-field", totalExpense);
    return totalExpense;
}

// to calculate and update percentage value
function calcSavings(percentage) {
    const balanceAfterExpense = calcTotalBalance(); //4500
    const incomeAmount = getInputValue("income-input-field");
    const savingAmount = (incomeAmount * percentage) / 100;

    // checking
    const erroMessage = document.getElementById("saving-error-message");
    if (savingAmount > balanceAfterExpense) {
        erroMessage.innerHTML = "insufficient balance for saving.";
        erroMessage.style.display = 'block';
        updatePreviousValue("saving-amount", 0);
    } else {
        erroMessage.style.display = 'none';
        updatePreviousValue("saving-amount", savingAmount);
    }

    const remainingBalance = balanceAfterExpense - savingAmount;
    // updating values
    updatePreviousValue("remaining-amount", remainingBalance);

}