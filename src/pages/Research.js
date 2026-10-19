import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Research.css";

const Research = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchTerm);
  };

  const researchCategories = [
    {
      title: "Academic Journals",
      description: "Access to peer-reviewed academic journals and publications",
      icon: "📚"
    },
    {
      title: "Research Databases",
      description: "Comprehensive databases for academic research",
      icon: "🔍"
    },
    {
      title: "Theses & Dissertations",
      description: "Access to student and faculty research papers",
      icon: "📄"
    },
    {
      title: "Research Guides",
      description: "Subject-specific research guides and tutorials",
      icon: "📖"
    },
    {
      title: "Citation Tools",
      description: "Tools for managing citations and references",
      icon: "📝"
    },
    {
      title: "Research Support",
      description: "Get help from research librarians",
      icon: "💡"
    }
  ];

  return (
    <div className="research-page">
      {/* Hero Section */}
      <div className="research-hero">
        <div className="hero-overlay">
          <Container>
            <h1 className="hero-title">Research Resources</h1>
            <p className="hero-subtitle">Access academic resources and research materials</p>
            
            <Form onSubmit={handleSearch} className="search-form">
              <Row className="g-0">
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Search research materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </Col>
                <Col md={2}>
                  <Button type="submit" className="search-button">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>

      {/* Research Categories */}
      <Container className="research-categories">
        <h2 className="section-title">Research Categories</h2>
        <Row className="g-4">
          {researchCategories.map((category, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="category-card">
                <Card.Body>
                  <div className="category-icon">{category.icon}</div>
                  <Card.Title>{category.title}</Card.Title>
                  <Card.Text>{category.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Quick Links Section */}
      <Container className="quick-links">
        <h2 className="section-title">Quick Links</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="quick-link-card">
              <Card.Body>
                <h5>Library Catalog</h5>
                <p>Search our collection of books, journals, and other materials</p>
                <Button variant="outline-primary">Browse Catalog</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="quick-link-card">
              <Card.Body>
                <h5>Research Help</h5>
                <p>Get assistance from our research librarians</p>
                <Button variant="outline-primary">Request Help</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="quick-link-card">
              <Card.Body>
                <h5>Research Workshops</h5>
                <p>Attend workshops to improve your research skills</p>
                <Button variant="outline-primary">View Schedule</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Research;