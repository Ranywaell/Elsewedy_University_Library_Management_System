import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: "Borrowing Services",
      description: "Borrow books, laptops, and other materials from our extensive collection",
      icon: "📚",
      features: [
        "Book lending",
        "E-book access",
        "Interlibrary loan",
        "Course reserves"
      ]
    },
    {
      title: "Study Spaces",
      description: "Access various study areas and facilities for individual and group work",
      icon: "🏫",
      features: [
        "Individual study rooms",
        "Group study areas",
        "Computer labs",
        "Silent study zones"
      ]
    },
    {
      title: "Research Support",
      description: "Get assistance with your research from our expert librarians",
      icon: "🔍",
      features: [
        "Research consultations",
        "Citation help",
        "Database training",
        "Literature reviews"
      ]
    },
    {
      title: "Digital Resources",
      description: "Access our digital collection and online resources",
      icon: "💻",
      features: [
        "Online databases",
        "E-journals",
        "Digital archives",
        "Streaming media"
      ]
    },
    {
      title: "Printing & Copying",
      description: "Print, scan, and copy services for students and faculty",
      icon: "🖨️",
      features: [
        "Color printing",
        "Scanning services",
        "Document binding",
        "Large format printing"
      ]
    },
    {
      title: "Workshops & Training",
      description: "Attend workshops to enhance your research and study skills",
      icon: "🎓",
      features: [
        "Research workshops",
        "Citation training",
        "Database tutorials",
        "Study skills sessions"
      ]
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <div className="hero-overlay">
          <Container>
            <h1 className="hero-title">Library Services</h1>
            <p className="hero-subtitle">Discover the wide range of services we offer to support your academic journey</p>
          </Container>
        </div>
      </div>

      {/* Services Grid */}
      <Container className="services-grid">
        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="service-card">
                <Card.Body>
                  <div className="service-icon">{service.icon}</div>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <Button variant="outline-primary" className="service-button">
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Contact Section */}
      <div className="contact-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Need Help?</h2>
              <p>Our library staff is here to assist you with any questions or concerns about our services.</p>
              <Button variant="primary" size="lg" className="contact-button">
                Contact Support
              </Button>
            </Col>
            <Col md={6}>
              <div className="contact-info">
                <h3>Service Hours</h3>
                <ul className="hours-list">
                  <li><strong>Monday - Friday:</strong> 8:00 AM - 10:00 PM</li>
                  <li><strong>Saturday:</strong> 9:00 AM - 6:00 PM</li>
                  <li><strong>Sunday:</strong> 10:00 AM - 5:00 PM</li>
                </ul>
                <div className="contact-details">
                  <p><strong>Phone:</strong> (123) 456-7890</p>
                  <p><strong>Email:</strong> library@example.com</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Services; 