function getInputValue(ID) {
    const inputField = document.getElementById(ID);
    const inputValue = parseInt(inputField.value);
    if (inputValue < 0 || isNaN(inputValue)) {
        let errorDisplay = document.getElementById(ID).parentNode.nextElementSibling;
        if (inputValue < 0) {
            errorDisplay.innerHTML = "Please enter a positive number."
        } else if (isNaN(inputValue)) {
            errorDisplay.innerHTML = "Please enter a Number value."
        }
        return false;
    }
    // inputField.value = '';
    return inputValue;
}

let a = getInputValue("income-input-field");
console.log(a);