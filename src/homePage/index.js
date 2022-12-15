import React from "react";
import '../vendors/fontawesome-free-6.0.0-beta2-web/css/all.min.css'
import ProductFeed from "../productFeed";
import Sidebar from "../sidebar";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import Categories from "../categories";
import SearchBar from "../searchbar";
import ProductsList from "../products";
import ProductPage from "../productPage";
import Cart from "../cart";
import ProfilePage from "../profilePage";

// what to display if the user is not logged in (login and register options)
const NotLogged = () => {
  return(
      <>
        <Link to="/login" style={{textDecoration: 'none'}}>
          Login <br/></Link>
        <Link to="/register" style={{textDecoration: 'none'}}>
          Register <br/>
        </Link>
      </>
  )
}

// what to display if the user is logged in (cart)
const LoggedIn = (user, setUser) => {
  const navigate = useNavigate();
  return(
      <>
        {user.username} <br/>
        <Link to="/cart" style={{textDecoration: 'none'}}>
          Cart
          <i className="fas fa-shopping-cart"></i>
        </Link> <br/>
        <button className="btn" onClick={() => {
          setUser([]);
          navigate('/');
        }}>Log out</button>
      </>
  )
}

const HomePage = (props) => {
  return (
        <div className="container">
          <div className="row">
            <div className="col-2">
              <Sidebar user={props.user}/>
            </div>
            <div className="col-9">
              {/* //<SearchBar/> */}
              <Routes>
                {/* <Route path="/" exact element={<ProductFeed/>}/> */}
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/products" element={<ProductsList/>}/>
                <Route path="/products/:id" element={<ProductPage user={props.user} cart={props.cart} setCart={props.setCart}/>}/>
                <Route path="/products/categories/:category" element={<ProductsList/>}/>
                <Route path="/cart" element={<Cart cart={props.cart}/>}/>
                <Route path="/profile/:username" element={<ProfilePage user={props.user} setUser={props.setUser}/>}/>
              </Routes>
            </div>

            <div className="col-1 top-margin">
              {props.user.length === 0 ? NotLogged() : LoggedIn(props.user, props.setUser)}
            </div>

          </div>
        </div>
  )
}

export default HomePage;