import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productUrl = "https://dummyjson.com/products/" + id;
                const rs = await fetch(productUrl);
                const data = await rs.json();
                setProduct(data);

                // Lấy các sản phẩm liên quan
                if (data.category) {
                    const relatedUrl = `https://dummyjson.com/products/category/${data.category}`;
                    const relatedRs = await fetch(relatedUrl);
                    const relatedData = await relatedRs.json();
                    setRelatedProducts(relatedData.products); // Lưu danh sách các sản phẩm liên quan
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getProduct();
    }, [id]);

    // Hàm để render các ngôi sao dựa trên rating
    const renderStars = (rawRating) => {
        // Đảm bảo rawRating là một số và xử lý trường hợp null/undefined/non-numeric
        const rating = typeof rawRating === 'number' ? rawRating : 0;
        const stars = [];
        const roundedRating = Math.round(rating); // Làm tròn rating

        for (let i = 0; i < 5; i++) {
            if (i < roundedRating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />); // Ngôi sao vàng
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-muted" />); // Ngôi sao xám
            }
        }
        return stars;
    };

    return (
        <Container fluid className="my-5">
            <Row>
                {/* Hình ảnh sản phẩm */}
                <Col md={6} className="text-center">
                    <img
                        src={product?.thumbnail}
                        alt={product?.title}
                        className="img-fluid rounded"
                    />
                </Col>

                {/* Thông tin sản phẩm */}
                <Col md={6}>
                    <h6 className="text-uppercase text-muted">{product?.category}</h6>
                    <h2 className="fw-bold">{product?.title}</h2>
                    <p>
                        {/* Thay đổi lại dòng này để chỉ sử dụng product?.rating */}
                        {renderStars(product?.rating)}{" "}
                        <small className="text-muted">
                            ({product?.reviews?.length ? product.reviews.length : 0} reviews)
                        </small>
                    </p>

                    <p>{product?.description}</p>

                    {/* Add to cart section */}
                    <div className="d-flex justify-content-between align-items-center p-3 border rounded mt-4">
                        <div>
                            <p className="mb-0 fw-bold">{product?.title}</p>
                            <small className="text-muted">{product?.brand}</small>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <h4 className="mb-0">${product?.price}</h4>
                            <Button variant="primary">
                                Add to Cart <Badge bg="light" text="dark">+</Badge>
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* Hiển thị sản phẩm liên quan */}
            {relatedProducts.length > 0 && (
                <div className="mt-5">
                    <h3>Sản phẩm liên quan</h3>
                    <Row>
                        {relatedProducts.map((p) => (
                            <Col md={4} key={p.id}>
                                {/* Tạo card hoặc component để hiển thị sản phẩm */}
                                <h5>{p.title}</h5>
                                <img src={p.thumbnail} alt={p.title} className="img-fluid" />
                                <p>${p.price}</p>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </Container>
    );
}

export default Product;