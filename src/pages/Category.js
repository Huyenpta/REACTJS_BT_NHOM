
// import { useState, useEffect } from "react";
// import { Card, Col, Container, Row, Button } from "react-bootstrap";
// function Category() {
//     const [category, setCategory] = useState([]);
//     const getCategory = async () => {
//         try {
//             const url = `https://dummyjson.com/products?limit=20`;
//             const rs = await fetch(url);
//             const data = await rs.json();
//             setCategory(data.products);
//         } catch (error) {

//         }
//     }
//     useEffect(() => {
//         // call api  lấy dữ liệu dự báo thời tiết 5 ngày
//         getCategory();
//     }, []);
//     return (
//         <Container>
//             <h1>Products</h1>
//             <Row>
//                 {
//                     category.map((item, index) => {
//                         return (
//                             <Col key={index} md={4} className="mb-3" xs={12} lg={3}>
//                                 <Card className="h-100 w-100" style={{ width: '18rem' }}>
//                                     <Card.Img variant="top" src={item.images[0]} alt={item.title} />
//                                     <Card.Body className="d-flex flex-column">
//                                         <Card.Title>{item.title}</Card.Title>
//                                         <Card.Text>C${item.price}</Card.Text>
//                                         <div className="mt-auto">
//                                             <Button className="btn btn-primary w-100" variant="primary">Add to Cart</Button>
//                                         </div>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         );
//                     })
//                 }
//             </Row>
//         </Container>
//     );
// }
// export default Category;

import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Category() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const url = "https://dummyjson.com/product/category/" + slug;
        const rs = await fetch(url);
        const data = await rs.json();
        setProducts(data.products);
    }
    useEffect(() => {
        getProducts();
    }, [slug]);
    return (
        <div>
            <h1>Category Page: {slug}</h1>
            <Container>
                <Row>
                    {
                        products.map((e, i) => {
                            return (
                                <Col key={i} xs={3} className="mb-3">
                                    <Card>
                                        <Card.Img src={e.thumbnail} />
                                        <Card.Body>
                                            <Card.Title>
                                                <Link to={"/product/" + e.id}>
                                                    {e.title}
                                                </Link>
                                            </Card.Title>
                                            <Card.Text>${e.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    }


                </Row>
            </Container>
        </div>
    )
};
export default Category;