import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const NavComponent = ()=>{
  const [categories,setCategories] = useState([]);
  const getCategories = async ()=>{
    const url = "https://dummyjson.com/product/categories";
    const rs = await fetch(url);
    const data = await rs.json();
    setCategories(data);
  }
  useEffect(()=>{
    getCategories();
  },[]);
    return (
        <ul>
          {
            categories.map((e,i)=>{
              return (
                <li key={i}>
                  <Link to={"/category/"+e.slug}>{e.name}</Link>
                </li>
              );
            })
          }
        
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/forecast">Forecast</Link>
          </li>
       </ul>
    );
}
export default NavComponent;