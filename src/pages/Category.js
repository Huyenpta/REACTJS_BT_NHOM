// src/pages/Category.js
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap"; // Thêm Button nếu bạn muốn dùng
import { Link, useParams } from "react-router-dom";
import { useCart } from '../components/CartContext'; // Cần import nếu muốn dùng addToCart

function Category() {
    const { categoryName } = useParams(); // Sửa từ 'slug' thành 'categoryName' để khớp với App.js
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart(); // Lấy addToCart nếu bạn muốn thêm vào giỏ hàng từ đây

    const getProducts = async () => {
        try { // Luôn thêm try-catch cho fetch API
            // SỬA URL TẠI ĐÂY: "products" thay vì "product"
            const url = `https://dummyjson.com/products/category/${categoryName}`; 
            console.log("Fetching products from:", url); // Debugging: Kiểm tra URL
            const rs = await fetch(url);
            const data = await rs.json();
            setProducts(data.products); // API trả về { products: [...], total: ... }
        } catch (error) {
            console.error("Error fetching products for category:", categoryName, error);
            setProducts([]); // Đảm bảo state không bị treo nếu có lỗi
        }
    }
    useEffect(() => {
        getProducts();
    }, [categoryName]); // Dependecy array đúng, sẽ gọi lại khi categoryName thay đổi

    if (products.length === 0 && categoryName) { // Thêm điều kiện categoryName để tránh hiển thị khi mới load
        return (
            <Container className="my-5 text-center">
                <p>Không có sản phẩm nào trong danh mục "{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}".</p>
            </Container>
        );
    }
    
    return (
        <Container className="my-5"> {/* Thêm margin top/bottom */}
            <h1 className="mb-4">Danh mục: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
            <Row>
                {
                    products.map((e, i) => {
                        return (
                            <Col key={e.id} xs={12} sm={6} md={4} lg={3} className="mb-4"> {/* Dùng e.id làm key, sửa kích thước cột */}
                                <Card className="h-100">
                                    <Link to={"/product/" + e.id} className="text-decoration-none text-dark">
                                        <Card.Img variant="top" src={e.thumbnail} style={{ height: '180px', objectFit: 'contain', padding: '10px' }} />
                                    </Link>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fw-bold">{e.title}</Card.Title>
                                        <Card.Text className="text-muted mb-2">${e.price.toFixed(2)}</Card.Text>
                                        <Card.Text className="text-sm text-truncate">{e.description}</Card.Text>
                                        <div className="mt-auto"> {/* Đẩy nút xuống dưới */}
                                            <Button 
                                                className="w-100" 
                                                variant="primary" 
                                                onClick={() => addToCart(e)} // Gọi addToCart khi click
                                            >
                                                Thêm vào giỏ
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        </Container>
    )
};
export default Category;