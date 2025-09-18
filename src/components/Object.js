import { Container, Row, Col, Card } from 'react-bootstrap';
import objectsData from '../data/objects.json';

const Object = () => {
  return (
    <section className="my-5">
      <Container>
        <h2 className="text-center mb-4">WHO SHOULD LEARN PROGRAMING IN FPT APTECH?</h2>
        <Row className="justify-content-center">
          {objectsData.map(obj => (
            <Col md={4} key={obj.id} className="mb-4">
              <Card className="text-center h-100">
                <Card.Img variant="top" src={obj.image} />
                <Card.Body>
                  <Card.Title>{obj.title}</Card.Title>
                  <Card.Text>{obj.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Object;