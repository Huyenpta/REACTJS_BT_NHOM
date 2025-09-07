// import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
// import { useCart } from '../components/CartContext' // Import hook useCart
// import { Link } from 'react-router-dom';
// const Cart = () => {
//     const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal } = useCart();

//     if (cartItems.length === 0) {
//         return (
//             <Container className="my-5 text-center">
//                 <Alert variant="info">Giỏ hàng của bạn đang trống.</Alert>
//                 <Link to="/" className="btn btn-primary mt-3">Tiếp tục mua sắm</Link>
//             </Container>
//         );
//     }

//     return (
//         <Container className="my-5">
//             <h2 className="mb-4">Giỏ hàng của bạn</h2>
//             <Row>
//                 <Col md={8}>
//                     <ListGroup variant="flush">
//                         {cartItems.map((item) => (
//                             <ListGroup.Item key={item.id} className="d-flex align-items-center">
//                                 <img
//                                     src={item.thumbnail}
//                                     alt={item.title}
//                                     style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
//                                 />
//                                 <div className="flex-grow-1">
//                                     <h5 className="mb-1">{item.title}</h5>
//                                     <p className="mb-1 text-muted">${item.price.toFixed(2)}</p>
//                                     <div className="d-flex align-items-center">
//                                         <Button
//                                             variant="outline-secondary"
//                                             size="sm"
//                                             onClick={() => decreaseQuantity(item.id)}
//                                             disabled={item.quantity === 1} // Vô hiệu hóa nút nếu số lượng là 1
//                                         >
//                                             -
//                                         </Button>
//                                         <span className="mx-2">{item.quantity}</span>
//                                         <Button
//                                             variant="outline-secondary"
//                                             size="sm"
//                                             onClick={() => increaseQuantity(item.id)}
//                                         >
//                                             +
//                                         </Button>
//                                         <Button
//                                             variant="danger"
//                                             size="sm"
//                                             className="ms-3"
//                                             onClick={() => removeFromCart(item.id)}
//                                         >
//                                             Xóa
//                                         </Button>
//                                     </div>
//                                 </div>
//                                 <div className="ms-auto fw-bold">
//                                     ${(item.price * item.quantity).toFixed(2)}
//                                 </div>
//                             </ListGroup.Item>
//                         ))}
//                     </ListGroup>
//                 </Col>
//                 <Col md={4}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Tổng cộng</Card.Title>
//                             <ListGroup variant="flush">
//                                 <ListGroup.Item className="d-flex justify-content-between">
//                                     <span>Tổng tiền hàng:</span>
//                                     <span>${getCartTotal()}</span>
//                                 </ListGroup.Item>
//                                 {/* Bạn có thể thêm các mục khác như phí ship, thuế ở đây */}
//                                 <ListGroup.Item className="d-flex justify-content-between fw-bold">
//                                     <span>Tổng thanh toán:</span>
//                                     <span>${getCartTotal()}</span>
//                                 </ListGroup.Item>
//                             </ListGroup>
//                             <Button variant="success" className="w-100 mt-3">
//                                 Thanh toán
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Cart;

import { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import GlobalContext from "../context/context";

function Cart() {
  const { data, setData } = useContext(GlobalContext);
  const cart = data.cart;

  // Hàm tăng số lượng
  const increaseQty = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, buy_qty: item.buy_qty + 1 } : item
    );
    setData({ ...data, cart: newCart });
  };

  // Hàm giảm số lượng
  const decreaseQty = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id ? { ...item, buy_qty: item.buy_qty - 1 } : item
      )
      .filter((item) => item.buy_qty > 0); // xoá nếu số lượng = 0
    setData({ ...data, cart: newCart });
  };

  // Hàm xóa sản phẩm
  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setData({ ...data, cart: newCart });
  };

  // Tính tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.buy_qty, 0);

  return (
    <Container>
      <h1>Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Chưa có sản phẩm nào trong giỏ.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      width={60}
                      className="me-2"
                    />
                    {item.title}
                  </td>
                  <td>{item.price}$</td>
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </Button>{" "}
                    {item.buy_qty}{" "}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </Button>
                  </td>
                  <td>{item.price * item.buy_qty}$</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3 className="text-end">Tổng cộng: {total}$</h3>
        </>
      )}
    </Container>
  );
}

export default Cart;
