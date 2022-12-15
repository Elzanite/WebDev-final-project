import './App.css';
import HomePage from "./homePage";
import React, {useState} from "react";
import './vendors/fontawesome-free-6.0.0-beta2-web/css/all.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from "./loginPage";
import RegisterPage from "./registerPage";


function App() {

  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);


  // useEffect(() => {
  //   fetch('http://www.fakestore.com/products')
  //   .then(res => res.json())
  //   .then(result => setTest(result))
  // })

  return (

      <BrowserRouter>
        <div className="App container">
          <Routes>
            <Route path="/*" element={<HomePage user={user} setUser={setUser}
                                                cart={cart} setCart={setCart}/>}/>
            <Route exact path="/register" element={<RegisterPage/>}/>
            <Route exact path="/login" element={<LoginPage setUser={setUser} user={user}/>}/>
          </Routes>
        </div>
      </BrowserRouter>

);
}

export default App;