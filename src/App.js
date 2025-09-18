import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Object from './components/Object';
import Subject from './components/Subject';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        {/* Banner Section */}
        <section className="my-5">
          <Container>
            <Row className="justify-content-center">
              <Col>
                <img src="images/baner-aptech.png" alt="FPT Aptech Banner" className="img-fluid" />
              </Col>
            </Row>
          </Container>
        </section>

        <Object />
        <Subject />
      </main>
      <Footer />
    </div>
  );
}

export default App;