import {useState, useContext} from 'react';
import Context from './Context';
import '../CSS/Login.css'

const Login = ({error}) => {

  const [username, setUsername] = useState('');
  const {handleLogin} = useContext(Context);

  function onSubmit(e){
      e.preventDefault();
      const trimmedUsername = username.trim();
      if(!trimmedUsername){
          return;
      }
      handleLogin(trimmedUsername);
  }

  const onLogin = (e) =>{
      setUsername(e.target.value);
  }

  return(
      <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Username</h2>
        <form onSubmit={onSubmit} action='#login'>
          <div className="input-field">
            <input type="text" id="username" className="username"
              name="username" value={username}
              onInput={onLogin}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <span className='error'><h5>{error}</h5></span>
      </div>
    </div>
  );
}

export default Login;