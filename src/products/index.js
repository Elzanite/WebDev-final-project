import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchLink = (params.category === undefined ? '' : '/category/' + params.category)

    fetch('https://fakestoreapi.com/products' + fetchLink)
    .then(res => res.json())
    .then(result =>  setProducts(result))
  }, [params.category])


  return (
      <div className="container">
        <h1 className="highlighted-text global-font">Products</h1>
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

export default ProductsList;