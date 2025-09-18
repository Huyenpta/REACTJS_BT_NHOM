import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import subjectsData from '../data/subjects.json';

const Subject = () => {
  const [expandedSubject, setExpandedSubject] = useState(1);

  const handleSubjectClick = (id) => {
    setExpandedSubject(id);
  };

  return (
    <section className="my-5">
      <Container>
        <h2 className="text-center mb-4">WHAT IS THE COURSE PROGRAM?</h2>
        <Row className="justify-content-center">
          {subjectsData.map((subj) => (
            <Col md={2} key={subj.id} className="mb-4 text-center">
              <div
                onClick={() => handleSubjectClick(subj.id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={subj.image}
                  alt={subj.subject}
                  style={{
                    height: '100px',
                    width: '100px',
                    objectFit: 'contain',
                    borderRadius: '50%',
                    border: expandedSubject === subj.id ? '2px solid orange' : 'none'
                  }}
                />
                <h3 className="mt-2" style={{ fontSize: '1rem' }}>
                  {subj.subject}
                </h3>
              </div>
            </Col>
          ))}
        </Row>

        {/* Nội dung mô tả */}
        <Row className="justify-content-center mt-4">
          <Col md={10} className="text-center">
            {(() => {
              const selected = subjectsData.find(
                (subj) => subj.id === expandedSubject
              );
              return selected ? <p>{selected.description}</p> : null;
            })()}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Subject;
