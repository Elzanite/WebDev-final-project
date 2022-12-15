import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(result => setCategories(result))
  }, [])

  return (
      <>
        {categories.map(category => {
          return (
              <Link to={"/products/categories/" + category}>
                <div>{category}</div>
              </Link>
          )
        }
        )}
      </>
  )
};

export default Categories;