import { Container, Row, Col, Card } from 'react-bootstrap';
import subjectsData from '../data/subjecs.json';

const Subject = () => {
  return (
    <section className="my-5">
      <Container>
        <h2 className="text-center mb-4">WHAT IS THE COURSE PROGRAM?</h2>
        <Row className="justify-content-center">
          {subjectsData.map(subj => (
            <Col md={4} key={subj.id} className="mb-4">
              <Card className="text-center h-100">
                <Card.Img variant="top" src={subj.image} style={{ height: '150px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>{subj.subject}</Card.Title>
                  <Card.Text>{subj.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Subject;