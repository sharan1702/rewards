import { useReducer, useContext } from 'react';
import { reducer, initialState } from '../add-reducer';
import { getInputError } from '../errors';
import ReceiptList from './ReceiptList';
import Context from './Context';
import '../CSS/NewReceipt.css';
import '../CSS/Logout.css';

const NewReceipt = ({ username, bills, error }) => {
    const { handleLogout, handleNewReceipt } = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmitReceipt = (e) => {
        e.preventDefault();
        const trimmedAmount = state.newAmount.trim();
        const trimmedDescription = state.newDescription.trim();
        const trimmedDate = state.newDate.trim();
        const trimmedExpense = state.newExpense.trim();

        const inputError = getInputError(trimmedExpense, trimmedAmount, trimmedDate);
        if (inputError) {
            dispatch({ type: 'setInputError', inputError });
        } 
        else {
            handleNewReceipt(trimmedDate, trimmedExpense, trimmedAmount, trimmedDescription);
            dispatch({ type: 'clearInputFields' });
        }
    }

    const onSubmitLogout = (e) => {
        e.preventDefault();
        handleLogout();
    }



    return (
        <div className='content'>
            <div className='header'>
                <span className='error'><h3>{error}</h3></span>
                <span className='headerUser'>
                    {username.charAt(0).toUpperCase()}
                </span>
                <button className='logoutBtn' onClick={onSubmitLogout}>
                    Logout
                </button>
            </div>

            <div className='billArea'>

                <ReceiptList bills={bills} />
                <form className='newBill' onSubmit={onSubmitReceipt}>
                    <h2> New Expense</h2>

                    <label><span className='input-receipt-label'>Date</span><br />
                        <input value={state.newDate}
                            onChange={(e) => dispatch({ type: 'setNewDate', input: e.target.value })}
                            placeholder="mm/dd/yyyy"
                            required />
                    </label><br />

                    <label><span className='input-receipt-label'>Shop</span><br />
                        <input value={state.newExpense}
                            onChange={(e) => dispatch({ type: 'setNewAddress', input: e.target.value })}
                            required />
                    </label><br />

                    <label><span className='input-receipt-label' >Cost($)</span><br />
                        <input className='amount-input'
                            value={state.newAmount}
                            onChange={(e) => dispatch({ type: 'setNewAmount', input: e.target.value })}
                            placeholder="Upto 2 decimals"
                            required />
                    </label><br />

                    <label><span className='input-receipt-label'>Description</span><br />
                        <input value={state.newDescription}
                            onChange={(e) => dispatch({ type: 'setNewDescription', input: e.target.value })
                            } />
                    </label><br />

                    <button type="submit" className="add-button" value="Add">
                        Add
                    </button>
                    <span className='error'><h5>{state.inputError}</h5></span>
                </form>

            </div>
        </div>
    );
}


export default NewReceipt;