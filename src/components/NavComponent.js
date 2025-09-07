import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Icon giỏ hàng
//import { useCart } from './CartContext'; // Import hook useCart (đường dẫn này giả định CartContext cùng thư mục)
import GlobalContext from "../context/context";

const NavComponent = () => {
  const {data, setData} = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  // <<< PHẢI GỌI useCart() ĐỂ LẤY getTotalItems >>>
  //const { getTotalItems } = useCart();

  const getCategories = async () => {
    const url = "https://dummyjson.com/products/categories"; // URL này trả về MẢNG CHUỖI
    const rs = await fetch(url);
    const data = await rs.json();
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Nav className="justify-content-center">
      {
        categories.map((e, i) => {
          return (
            <Nav.Item key={i}>
              {/* TRUY CẬP THUỘC TÍNH `name` CỦA ĐỐI TƯỢNG ĐỂ HIỂN THỊ */}
              {/* TRUY CẬP THUỘC TÍNH `slug` HOẶC `name` ĐỂ TẠO LINK */}
              <Nav.Link as={Link} to={"/category/" + (e.slug || e.name)}>
                {e.name}
              </Nav.Link>
            </Nav.Item>
          );
        })
      }
      <Nav.Item>
        <Nav.Link as={Link} to="/cart"> Cart ({data.cart.length})
          {/* <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng */}
          {/* getTotalItems đã được lấy ra từ useCart() */}
          {/* {getTotalItems() > 0 && (
            <Badge pill bg="danger" className="ms-1">
              {getTotalItems()}
            </Badge>
          )} */}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/forecast">
          Forecast
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
export default NavComponent;