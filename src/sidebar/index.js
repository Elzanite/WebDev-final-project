import {Link} from "react-router-dom";

const Sidebar = (props) => {
  return(

      <div className="top-margin">

        <div>
          <h1>
            <Link to="/" className="global-font text-color remove-decoration">
              Shoppy
            </Link>
          </h1>
        </div>

        <div className="list-group">
          <Link to="/" className="list-group-item">
            <i className="fas fa-shopping-bag"></i></Link>

          <Link to="/" className="list-group-item">
            <div className="row">
              <div className="col-2">
                <i className="fas fa-home"></i>
              </div>
              <div className="col-2 d-none d-lg-block">
                Home
              </div>
            </div>
          </Link>

          <Link to="/products" className="list-group-item">
            <div className="row">
              <div className="col-2">
                <i className="fas fa-hashtag"></i>
              </div>
              <div className="col-2 d-none d-lg-block">
                Products
              </div>
            </div>
          </Link>

          <Link to="/categories" className="list-group-item">
            <div className="row">
              <div className="col-2">
                <i className="fas fa-list-ul"></i>
              </div>
              <div className="col-2 d-none d-lg-block">
                Categories
              </div>
            </div>
          </Link>

          <Link to={"/profile/" + props.user.username} className="list-group-item">
            <div className="row">
              <div className="col-2">
                <i className="fas fa-user-alt"></i>
              </div>
              <div className="col-2 d-none d-lg-block">
                Profile
              </div>
            </div>
          </Link>

        </div>
      </div>
  )
}

export default Sidebar