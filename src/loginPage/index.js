import {useState} from "react";
import {
  useNavigate
} from "react-router-dom";
import "../homePage/style.css"

const LoginPage = (props) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'username-field':
        setUsername(event.target.value);
        return;
      case 'password-field':
        setPassword(event.target.value);
        return;
      case 'login-button':

        if (username.length === 0 || password.length === 0) {
          alert("Fill in both fields");
          return;
        }

        fetch('http://localhost:4000/api/users/' + username + "/" + password)
          .then(res => res.json())
          .then(result => {
            if (result.length > 0) {
              props.setUser(result[0]); 
              navigate('/');
            } else {
              alert("Invalid username or password. Try again");
              setUsername([]);
              setPassword([]);
            }
          })
        return;
      default:
        return;
    }
  }

  return (
      <div className="container">
        <h1 className="global-font highlighted-text top-margin">Login Page</h1>

        <br/><br/><br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="username-field">Username:</label>
          </div>
          <div className="col-2">
            <input id="username-field" className="form-control"
                   placeholder="username" onChange={handleChange} value={username}/>
          </div>
        </div>

        <br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="password-field">Password:</label>
          </div>
          <div className="col-2">
            <input type="password" id="password-field" className="form-control"
                   placeholder="password" onChange={handleChange} value={password}/>
          </div>
        </div>

        <button className="btn btn-primary" id="login-button" onClick={handleChange}>
          Login
        </button>
      </div>
  )
}

export default LoginPage;
