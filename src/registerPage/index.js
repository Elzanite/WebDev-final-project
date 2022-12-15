import {useState} from "react";
import {
  useNavigate
} from "react-router-dom";
import "../homePage/style.css"

const RegisterPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);
  const [dob, setDob] = useState([]);
  const [address, setAddress] = useState([]);
  const [isSeller, setIsSeller] = useState(0);

  const handleChange = (event) => {
    console.log(isSeller);
    switch (event.target.id) {
      case 'username-field':
        setUsername(event.target.value);
        return;
      case 'password-field':
        setPassword(event.target.value);
        return;
      case 'first-name-field':
        setFirst(event.target.value);
        return;
      case 'last-name-field':
        setLast(event.target.value);
        return;
      case 'date-field':
        setDob(event.target.value);
        return;
      case 'address-field':
        setAddress(event.target.value);
        return;
      case 'login-button':
        fetch('http://localhost:4000/api/users', {
          method: 'POST',
          body: JSON.stringify({username: username, password: password,
            first: first, last: last, dob: dob, address: address, isSeller: isSeller}),
          headers: {
            'content-type':'application/json'
          }
        })
          navigate("/login")
        return;
      default:
        return;
    }
  }

  return (
      <div className="container">
        <h1 className="global-font highlighted-text top-margin">Register Page</h1>

        <br/><br/><br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="username-field">Username:</label>
          </div>
          <div className="col-2">
            <input id="username-field" className="form-control"
                   placeholder="username" onChange={handleChange} value={username} required/>
          </div>
        </div>

        <br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="password-field">Password:</label>
          </div>
          <div className="col-2">
            <input type="password" id="password-field" className="form-control"
                   placeholder="password" onChange={handleChange} value={password} required/>
          </div>
        </div>

        <br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="first-name-field">First Name:</label>
          </div>
          <div className="col-2">
            <input  id="first-name-field" className="form-control"
                   placeholder="First name" onChange={handleChange} value={first} required/>
          </div>
        </div> <br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="last-name-field">Last Name:</label>
          </div>
          <div className="col-2">
            <input id="last-name-field" className="form-control"
                   placeholder="Last name" onChange={handleChange} value={last} required/>
          </div>
        </div> <br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="date-field">Date of Birth:</label>
          </div>
          <div className="col-5">
            <input id="date-field" className="form-control" type="date"
                   placeholder="Last name" onChange={handleChange} value={dob} required/>
          </div>
        </div> <br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="address-field">Address:</label>
          </div>
          <div className="col-5">
            <input id="address-field" className="form-control"
                   placeholder="Address" onChange={handleChange} value={address} required/>
          </div>
        </div> <br/>

        <div className="row">
          <div className="col-2">
            <label htmlFor="is-seller" className="form-check-label">Is a Seller?:</label>
          </div>
          <div className="col-2">
            <input id="is-seller" className="form-check-input" type="checkbox"
                   onClick={() => setIsSeller((isSeller + 1) % 2)} />
          </div>
        </div> <br/>

        <button className="btn btn-primary" type="submit" id="login-button" onClick={handleChange}>
          Login
        </button>
      </div>
  )
}

export default RegisterPage;