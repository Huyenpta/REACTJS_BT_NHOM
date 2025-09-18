import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import subjectsData from '../data/subjects.json';

const Subject = () => {
  // Khởi tạo state với id của ReactJS (là 1)
  const [expandedSubject, setExpandedSubject] = useState(1);

  const handleSubjectClick = (id) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  return (
    <section className="my-5">
      <Container>
        <h2 className="text-center mb-4">WHAT IS THE COURSE PROGRAM?</h2>
        <Row className="justify-content-center">
          {subjectsData.map(subj => (
            <Col md={2} key={subj.id} className="mb-4 text-center">
              <div onClick={() => handleSubjectClick(subj.id)} style={{ cursor: 'pointer' }}>
                <img 
                  src={subj.image} 
                  alt={subj.subject} 
                  style={{ 
                    height: '100px', 
                    width: '100px', 
                    objectFit: 'contain',
                    borderRadius: '50%',
                  }} 
                />
                <h3 className="mt-2" style={{ fontSize: '1rem' }}>{subj.subject}</h3>
              </div>
            </Col>
          ))}
        </Row>
        {/* Nội dung mô tả sẽ hiển thị full width ở đây, không có khung */}
        {expandedSubject !== null && (
          <Row className="justify-content-center mt-4">
            <Col md={10} className="text-center">
              <p>
                {subjectsData.find(subj => subj.id === expandedSubject).description}
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Subject;