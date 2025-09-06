import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { useCart } from '../components/CartContext' // Import hook useCart
import { Link } from 'react-router-dom';
const Cart = () => {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <Container className="my-5 text-center">
                <Alert variant="info">Giỏ hàng của bạn đang trống.</Alert>
                <Link to="/" className="btn btn-primary mt-3">Tiếp tục mua sắm</Link>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4">Giỏ hàng của bạn</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.id} className="d-flex align-items-center">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                                />
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">{item.title}</h5>
                                    <p className="mb-1 text-muted">${item.price.toFixed(2)}</p>
                                    <div className="d-flex align-items-center">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => decreaseQuantity(item.id)}
                                            disabled={item.quantity === 1} // Vô hiệu hóa nút nếu số lượng là 1
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="ms-3"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                                <div className="ms-auto fw-bold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Tổng cộng</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Tổng tiền hàng:</span>
                                    <span>${getCartTotal()}</span>
                                </ListGroup.Item>
                                {/* Bạn có thể thêm các mục khác như phí ship, thuế ở đây */}
                                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                                    <span>Tổng thanh toán:</span>
                                    <span>${getCartTotal()}</span>
                                </ListGroup.Item>
                            </ListGroup>
                            <Button variant="success" className="w-100 mt-3">
                                Thanh toán
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;