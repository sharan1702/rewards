import {useState, useEffect} from 'react';
import Receipt from './Receipt';
import '../CSS/ReceiptList.css';

const ReceiptList = ({bills}) => {

    const [billRecordings, setBillRecordings] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [reward, setReward] = useState(0);

    useEffect(()=>{
        const newBill = [];
        let tempCount = 0;
        let tempReward = 0;

        for(let curBillKey in bills){
            const curBill = bills[curBillKey];
            newBill.push(<Receipt key={curBill.id} receipt ={curBill}/>);
                tempReward += Number(curBill.amount) *100/10;  
                tempCount += Number(curBill.amount) *100;
                    
        }
        setBillRecordings(newBill);
        setTotalAmount(tempCount / 100);
        setReward((tempReward/100).toPrecision(4));
    },
    );

    return(
        <div className = "billList">
            <h1>Expense History</h1>
            <div className='reward'> 
                Rewards Earned: {reward} Points
            </div>
            <div className='title'>
                <span className='dateTitle'>
                    Date
                </span>
                <span>
                    Shop
                </span>
                <span>
                    Cost($)
                </span>
                <span>
                    Description
                </span>
                <span>
                    Reward Points
                </span>
            </div>
            {
            Object.keys(billRecordings).length === 0 ? 
                <p className='nothing'>
                 Add a Bill
                </p>
                :
                <p>
                </p>
            }
            <ul>
                {billRecordings}
            </ul>
        </div>
    );
}

export default ReceiptList;