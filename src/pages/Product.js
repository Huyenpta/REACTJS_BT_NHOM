// // src/components/Product.js
// import { useContext, useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Button, Badge } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import { useCart } from '../components/CartContext'; // Import hook useCart

// function Product() {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     //const { addToCart, getTotalItems } = useCart(); // Sử dụng addToCart và getTotalItems từ Context

//     useEffect(() => {
//         // const getProduct = async () => {
//         //     try {
//         //         const productUrl = "https://dummyjson.com/products/" + id;
//         //         const rs = await fetch(productUrl);
//         //         const data = await rs.json();
//         //         setProduct(data);

//         //         if (data.category) {
//         //             const relatedUrl = `https://dummyjson.com/products/category/${data.category}`;
//         //             const relatedRs = await fetch(relatedUrl);
//         //             const relatedData = await relatedRs.json();
//         //             // Loại bỏ sản phẩm hiện tại khỏi danh sách sản phẩm liên quan
//         //             setRelatedProducts(relatedData.products.filter(p => p.id !== data.id));
//         //         }
//         //     } catch (error) {
//         //         console.error("Error fetching data:", error);
//         //     }
//         // };
//         // getProduct();
//     }, [id]);
//     const renderStars = (rawRating) => {
//         const rating = typeof rawRating === 'number' ? rawRating : 0;
//         const stars = [];
//         const roundedRating = Math.round(rating);

//         for (let i = 0; i < 5; i++) {
//             if (i < roundedRating) {
//                 stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
//             } else {
//                 stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-muted" />);
//             }
//         }
//         return stars;
//     };

//     if (!product) {
//         return <Container className="my-5 text-center">Loading product details...</Container>;
//     }

//     return (
//         <Container fluid className="my-5">
//             <Row>
//                 <Col md={6} className="text-center">
//                     <img
//                         src={product?.thumbnail}
//                         alt={product?.title}
//                         className="img-fluid rounded"
//                         style={{ maxHeight: '400px', objectFit: 'contain' }}
//                     />
//                 </Col>

//                 <Col md={6}>
//                     <h6 className="text-uppercase text-muted">{product?.category}</h6>
//                     <h2 className="fw-bold">{product?.title}</h2>
//                     <p>
//                         {renderStars(product?.rating)}{" "}
//                         <small className="text-muted">
//                             ({product?.reviews?.length ? product.reviews.length : 0} reviews)
//                         </small>
//                     </p>

//                     <p>{product?.description}</p>

//                     <div className="d-flex justify-content-between align-items-center p-3 border rounded mt-4">
//                         <div>
//                             <p className="mb-0 fw-bold">{product?.title}</p>
//                             <small className="text-muted">{product?.brand}</small>
//                         </div>
//                         <div className="d-flex align-items-center gap-3">
//                             <h4 className="mb-0">${product?.price.toFixed(2)}</h4>
//                             <Button variant="primary" onClick={() => addToCart(product)}>
//                                 Add to Cart <Badge bg="light" text="dark">{getTotalItems() > 0 ? getTotalItems() : ''}</Badge>
//                             </Button>
//                         </div>
//                     </div>
//                 </Col>
//             </Row>

//             {/* Hiển thị sản phẩm liên quan */}
//             {relatedProducts.length > 0 && (
//                 <div className="mt-5">
//                     <h3>Sản phẩm liên quan</h3>
//                     <Row>
//                         {relatedProducts.map((p) => (
//                             <Col md={4} className="mb-4" key={p.id}>
//                                 <Link to={`/product/${p.id}`} className="text-decoration-none text-dark">
//                                     <div className="card h-100">
//                                         <img src={p.thumbnail} className="card-img-top" alt={p.title} style={{ height: '180px', objectFit: 'contain' }} />
//                                         <div className="card-body">
//                                             <h5 className="card-title">{p.title}</h5>
//                                             <p className="card-text fw-bold">${p.price.toFixed(2)}</p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </Col>
//                         ))}
//                     </Row>
//                 </div>
//             )}
//         </Container>
//     );
// }

// export default Product;

import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GlobalContext from "../context/context";

function Product() {
    const { data, setData } = useContext(GlobalContext);
    const [product, setProduct] = useState({});

    const { id } = useParams();
    const get_product_from_api = async () => {
        const url = "https://dummyjson.com/product/" + id;
        const rs = await fetch(url);
        const data = await rs.json();
        setProduct(data);
    }
    
    useEffect(() => {
        get_product_from_api();
    }, [id]);
    
    const addToCart = () => {
        const cart = [...data.cart];   // copy cart hiện tại
        const productToAdd = { ...product, buy_qty: 1 }; // thêm trường buy_qty

        let found = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                cart[i].buy_qty += 1;
                found = true;
                break;
            }
        }

        if (!found) {
            cart.push(productToAdd);
        }

        setData({ ...data, cart });
    };

    return (
        <Container>
            <h1>{product.title}</h1>
            <img src={product.thumbnail} width={500} />
            <p>{product.price}</p>
            <Button onClick={addToCart} variant="primary">Add to cart</Button>
        </Container>
    );
}
export default Product;