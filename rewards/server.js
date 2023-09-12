const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

const sessions = require('./sessions');
const users = require('./users');
const receipts = require('./receipts');

function getSidAndUsername(req){
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    return {sid, username};
}

app.get('/api/session', (req, res) =>{
    const {sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    res.json({username});
});

app.post('/api/session', (req, res) =>{
    const {username} = req.body;
    if(!username){
        res.status(400).json({error : 'required-username'});
        return;
    }
    if(username.toLowerCase() === 'dog' || /[^A-Za-z0-9_]+/g.test(username)){
        res.status(403).json({error : 'auth-insufficient'});
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if(!existingUserData){
        users.addUserData(username, receipts.makeReceiptList());
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getReceipts());
});

app.delete('/api/session', (req, res) =>{
    const {sid, username} = getSidAndUsername(req);
    if(sid){
        res.clearCookie('sid');
    }
    if(username){
        sessions.deleteSession(sid);
    }
    res.json({username});
});

app.get('/api/receipts', (req, res) =>{
    const {sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    res.json(users.getUserData(username).getReceipts());
});

app.post('/api/receipts', (req, res) => {
    const{sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    const{date, expense, amount, description} = req.body;
    if(!date || !expense || !amount){
        res.status(400).json({error : 'required-inputs'});
        return;
    }
    const receiptList = users.getUserData(username);
    const id = receiptList.addReceipt({date, expense, amount, description});
    res.json(receiptList.getBill(id));
});


app.patch('/api/receipts/:id', (req, res) =>{
    const{sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    const {id} = req.params;
    const {date, expense, amount, description} = req.body;
    const receiptList = users.getUserData(username);
    if(!receiptList.contains(id)){
        res.status(404).json({error : 'nonExistingId', message:`no bill wiht id ${id}`});
        return;
    }
    receiptList.updateReceipt(id, {date, expense, amount, description});
    res.json(receiptList.getBill(id));
});

app.delete('/api/receipts/:id', (req, res) =>{
    const{sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    const {id} = req.params;
    const receiptList = users.getUserData(username);
    const exists = receiptList.contains(id);
    if(exists){
        receiptList.deleteReceipt(id);
    }
    res.json({message: exists ? `bill ${id} deleted` : `bill ${id} does not exist`}); 
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));