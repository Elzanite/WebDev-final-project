import "../homePage/style.css";

const Cart = (props) => {

  return(
      <div>
        <h1 className="global-font products-bottom-margin">Cart:</h1>
        {props.cart.map(product => {
          return(
              <div className="row cart-list review-bottom-margin">
                <div className="col-9">
                  <img className="right-margin" src={product.img} width='15%' alt="Product"/>
                  <div className="container-fluid">{product.title}</div>
                </div>
                <div className="col-2">
                  Quantity: {product.quantity}
                </div>
              </div>
          )
        })}
      </div>
  )
}

export default Cart;