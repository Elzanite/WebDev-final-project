import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../homePage/style.css';
import {Link} from "react-router-dom";

const ProductPage = (props) => {
  const params = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState([]);
  const [order, setOrder] = useState({productId: [], quantity: [], img: "", title: ""})

  useEffect(() => {
    fetch('http://fakestoreapi.com/products/' + params.id)
    .then(res => res.json())
    .then(res => {
      setProduct(res);
      setOrder({productId: product.id, quantity: [], img: product.image, title: product.title})
    });

    fetch('http://localhost:4000/api/reviews/' + product.id)
    .then(res => res.json())
    .then(res => setReviews(res));

    fetch('http://fakestoreapi.com/products/category/' + product.category)
    .then(res => res.json())
    .then(res => res.slice(0,3))
    .then(res => setRelatedProducts(res));

  }, [params.id, product.id, product.category, product.image, product.title])


  const handlePurchase = (event) => {
    switch (event.target.id) {
      case 'purchase':
        if (order.quantity > 0) {
          props.setCart([
              ...props.cart,
              order
          ]);
          alert("Added to cart!")
        } else {
          alert("Please specify amount");
        }
        return;
      case 'quantity':
        console.log(props.cart)
        setOrder({productId: order.productId, quantity: event.target.value, img: order.img, title: product.title});
        return;
      case 'rating':
        setRating(event.target.value);
        return;
      case 'review':
        setReview(event.target.value);
        return;
      case 'review-click':
        fetch('http://localhost:4000/api/reviews/' + product.id, {
          method: 'POST',
          body: JSON.stringify({
            productId: product.id,
            username: props.user.username,
            first: props.user.first,
            last: props.user.last,
            body: review,
            rating: rating
          }),
          headers: {
            'content-type':'application/json'
          }
        }).then(response => response.json())
        .then(result => setReviews([
          ...reviews,
          result
        ]));

        setRating([]);
        setReview([]);
        return;
      default:
        return;
    }
  }


  const ReviewInput = () => {
    return(
        <div>
              <input id="review" className="form-control-lg container-fluid top-margin"
                     value={review} onChange={handlePurchase} placeholder="Review here"/>
          <div className="row">
            <div className="col-2">
              <input id="rating" type="number" max="5" min="0" value={rating} className="form-control top-margin container-fluid"
                     onChange={handlePurchase} placeholder="Rating"/>
            </div>
            <div className="col-2">
              <button id="review-click" className="btn btn-primary review-bottom-margin top-margin" onClick={handlePurchase}>
                Post
              </button>
            </div>
          </div>
        </div>)
  }


  return (
      <div className="container">
        <img src={product.image} width="20%" height="20%" alt="Product"/>
        <div className="global-font top-margin products-bottom-margin regular-text">
          {product.title} <br/>
          <br/><br/>
          Description: <br/>
          <p className="center">{product.description}</p>
          <br/><br/>
          {/*Rating: {product["rating"]["rate"]}*/}
          <br/><br/>
          Price: ${product.price}
          <br/><br/>
          <div className="button-box">
            <input id="quantity" className="form-control quantity" type="number" value={order.quantity} placeholder="Qty" onChange={handlePurchase}/>
            <button id="purchase" className="btn btn-primary purchase" onClick={handlePurchase}>Buy Now</button>
          </div>
        </div>


        <h1 className="global-font">Reviews</h1>
        {props.user.isSeller !== undefined && props.user.isSeller === 0 ? ReviewInput() : <></>}
        {reviews.map(review => {
          return(
              <div className="align-left">
                <Link to={"/profile/" + review.username}>
                  <h4>{review.username} -  {review.rating} <i className="far fa-star"></i></h4>
                </Link>
                <div className="top-margin global-font review-bottom-margin"> {review.body}</div>
              </div>
          )
        })}

        <h1 className="global-font">Related Products:</h1>
        <div className="row top-margin">
          {relatedProducts.map(related => {
            return (
                <Link to={"/products/" + related.id} className="col-4">
                  <img src={related.image} width="50%" height="50%" alt="Product"/>
                  <br/>
                  {product.title}
                </Link>
            )
          })}
        </div>
      </div>
  );
}

export default ProductPage;