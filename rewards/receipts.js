const uuid = require('uuid').v4;

function makeReceiptList(){
    const receiptList = {};

    const receipts = {
        ['receipt1'] : {
            id: 'receipt1',
            date: '06/25/2022',
            expense:'Qdoba',
            amount:'20.20',
            description:'Lunch',
                    
        },
        ['receipt2'] : {
            id: 'receipt2',
            date: '07/20/2022',
            expense:'Trader Joes',
            amount:'130.00',
            description:'Groceries for July',
        },
        ['receipt3'] : {
            id: 'receipt3',
            date: '08/11/2022',
            expense:'Ben & Jerrys',
            amount:'8.49',
            description:'Ice Cream',
        },
  
    };

    receiptList.contains = function contains(id){
        return !!receipts[id];
    };
    
    receiptList.getReceipts = function getReceipts(){
        return receipts;
    };

    receiptList.addReceipt = function addReceipt(newBill){
        const id = uuid();
        receipts[id] = {
            id,
            date: newBill.date,
            expense: newBill.expense,
            amount: newBill.amount,
            description: newBill.description,
        };
        return id;
    };

    receiptList.getBill = function getBill(id){
        return receipts[id];
    };

    receiptList.updateReceipt = function updateReceipt(id, bill){
        return receipts(id, bill);
    };

    receiptList.deleteReceipt = function deleteReceipt(id){
        delete receipts[id];
    };

    return receiptList;
};

module.exports = {
    makeReceiptList,
};