import { useContext } from "react";
import Context from "./Context";

const Receipt = ({ receipt }) => {
    const { handleDeleteReceipt, handleUpdateReceipt } = useContext(Context);
    return (
        <li key={receipt.id}>
            <span>{receipt.date}</span>
            <span>{receipt.expense}</span>
            <span>{receipt.amount}</span>
            <span>
                {receipt.description}
            </span>
            <span>
                {(Number(receipt.amount) / 10)}
            </span>
            <div>
                <button className="delete-button" onClick={() =>
                    handleDeleteReceipt(receipt.id, receipt.date, receipt.expense)}>
                    Delete
                </button>
            </div>
        </li>
    );
}

export default Receipt;