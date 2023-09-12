import {useEffect, useReducer} from 'react';
import {reducer, initialState} from'./reducer';
import {
  fetchSession,
  fetchLogin,
  fetchReceipts,
  fetchUpdateReceipt,
  fetchAddReceipt,
  fetchDeleteReceipt,
  fetchLogout
}
  from './services';
import {getErrorMessage} from './errors';
import Login from'./components/Login';
import Context from './components/Context';
import './CSS/Banner.css';
import logo from './images/rewards_logo.png';
import NewReceipt from './components/NewReceipt';
import Loading from './components/Loading';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);


  const handleLogin = (username) =>{
    fetchLogin(username)
    .then(bills =>{
      dispatch({type : 'login', username, bills});
    })
    .catch(err =>{
      if(err.error === 'auth-insufficient'){
        dispatch({type : 'showError', error:'Sorry, invalid username'});
      }else{
        dispatch({type: 'showError', error: getErrorMessage({type:'login'})});
      }
    });
  }

  const handleNewReceipt = (date, expense, amount, description) =>{
    fetchAddReceipt({date, expense, amount, description})
    .then(result=>{
      dispatch({type:'addBill', newBill:result});
    })
    .catch(err=>{
      console.log(err.error);
      dispatch({type:'showError', error: getErrorMessage({type: 'addBill', expense, date})});
    });
  }

  const handleUpdateReceipt = (id, date, expense) => {
    const billToUpdate = state.bills[id];
    fetchUpdateReceipt(id, billToUpdate)
    .then(()=>{
      dispatch({type : 'updateBill', id});
    })
    .catch(err => {
      console.log(err.error);
      dispatch({type:'showError', error: getErrorMessage({type:'updateBill', expense, date})});
    });
  }
  const handleDeleteReceipt = (id, date, expense) => {
    fetchDeleteReceipt(id)
    .then(()=>{
      dispatch({type: 'deleteBill', id});
    })
    .catch(err=>{
      console.log(err.error);
      dispatch({type: 'showError', error: getErrorMessage({type:'deleteBill', expense, date})});
    });
  }

  const handleLogout = () => {
    fetchLogout()
    .then(()=>{
      dispatch({type: 'logout'});
    })
    .catch(err =>{
      console.log(err.error);
      dispatch({type :'showError', error: getErrorMessage({type: 'logout'})});
    });
  }


useEffect(()=>{
  fetchSession()
  .then(session =>{
    fetchReceipts()
    .then(bills =>{
      dispatch({type:'login', username: session.username, bills})
    })
    .catch(err =>{
      console.log(err.error);
      dispatch({type: 'showError', error: getErrorMessage({type : 'retriveBills'})});
    });
  })
  .catch(err =>{
    if(err.error !== 'auth-missing'){
      dispatch({type : 'showError', error: getErrorMessage({type: 'retriveSession'})});
    }
  });
},[]);

  return (
    <div className="app">
      {state.username && !state.isLoaded && <Loading className='login-waiting'> Logging in</Loading>}
      <div className="banner">
        <div>
          <img src={logo} className="rewards-logo" alt="rewards-logo"/>
        </div>
        <p className="banner-text">
          Join Rewards and get 1 point for every $10 you spend!
        </p>
      </div>

      <Context.Provider value ={{
        handleLogin,
        handleNewReceipt,
        handleUpdateReceipt,
        handleDeleteReceipt,
        handleLogout
      }}>
        {state.username && state.isLoaded && 
        <NewReceipt username={state.username} 
                  bills = {state.bills} 
                  error={state.error}/>}
        {!state.username && 
        <Login error={state.error}/>}
      </Context.Provider>
    </div>
  );
}

export default App;
