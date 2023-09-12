export function getErrorMessage({ type, expense, date }) {
    let action;
    switch (type) {
        case 'retrieveSession':
            action = 'retrieving your login status';
            break;

        case 'login':
            action = 'logging in';
            break;

        case 'addBill':
            action = 'adding';
            break;

        case 'updateBill':
            action = 'updating';
            break;

        case 'deleteBill':
            action = 'deleting';
            break;

        case 'retrieveBills':
            action = 'retrieving your saved bills';
            break;

        case 'logout':
            action = 'logging out';
            break;

        default:
            action = '';
    }
    return formatErrorMessage(action, expense, date);
}



export const getInputError = (expense, amount, date) => {
    if (!date || !expense || !amount) {
        return 'Required fields cannot be empty.';
    }
    if (!validateDate(date)) {
        return `Please make the 'Date' input to be valid and in the mm/dd/yyyy format.`;
    }
    if (amount && !validateCost(amount)) {
        return 'Please enter a valid number.';
    }
    return '';
}

const formatErrorMessage = (action, expense, date) => {
    if (!action) {
        return `Please try again.`;
    } else if (!expense && !date) {
        return `Unexpected error while ${action}. Please try again.`;
    } else {
        return `Unexpected error while ${action} at '${expense}' on '${date}'. Please try again.`;
    }
}

const validateDate = (date) => {
    const dateRegEx = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/2\d{3}$/;
    return dateRegEx.test(date);
}
const validateCost = (moneyAmount) => {
    const amountRegEx = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
    return amountRegEx.test(moneyAmount);
}
