import React, {useEffect, useState} from "react";
import '../homePage/style.css'
import '../vendors/fontawesome-free-6.0.0-beta2-web/css/all.min.css'
import {Link} from "react-router-dom";

const ProductsFeed = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(result => result.slice(0, 5))
    .then(result => setProducts(result))
  }, [])


  return (
      <div className="container">
        <h1 className="highlighted-text global-font">Featured Products</h1>
        <div className="col">
          {products.map(product => {
            return (
                <Link to={"/products/" + product.id}>
                <div>
                  <img src={product.image} width="15%" height="15%" alt="Product"/>
                  <div className="regular-text global-font products-bottom-margin">
                    {product.title} <br/>
                    ${product.price}
                  </div>
                </div>
                </Link>
            )
          })}
        </div>
      </div>
  )
}

export default ProductsFeed;