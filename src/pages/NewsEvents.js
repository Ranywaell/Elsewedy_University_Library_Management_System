import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './NewsEvents.css';

const NewsEvents = () => {
  const news = [
    {
      title: "New Digital Resources Added",
      date: "March 15, 2024",
      category: "Resources",
      description: "We've expanded our digital collection with new e-books and academic journals.",
      image: "/photos/news1.jpg"
    },
    {
      title: "Library Renovation Update",
      date: "March 10, 2024",
      category: "Facilities",
      description: "Phase 2 of our library renovation project has been completed successfully.",
      image: "/photos/news2.jpg"
    },
    {
      title: "New Research Database Access",
      date: "March 5, 2024",
      category: "Technology",
      description: "Students now have access to three new academic research databases.",
      image: "/photos/news3.jpg"
    }
  ];

  const events = [
    {
      title: "Research Workshop Series",
      date: "April 5, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Main Library Room 301",
      description: "Learn advanced research techniques and citation methods."
    },
    {
      title: "Book Club Meeting",
      date: "April 12, 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Library Café",
      description: "Discussion of this month's selected book: 'The Future of Libraries'"
    },
    {
      title: "Digital Literacy Workshop",
      date: "April 19, 2024",
      time: "1:00 PM - 3:00 PM",
      location: "Computer Lab 2",
      description: "Improve your digital research and information literacy skills."
    }
  ];

  return (
    <div className="news-events-page">
      {/* Hero Section */}
      <div className="news-events-hero">
        <div className="hero-overlay">
          <Container>
            <h1 className="hero-title">News & Events</h1>
            <p className="hero-subtitle">Stay updated with the latest library news and upcoming events</p>
          </Container>
        </div>
      </div>

      {/* Featured News Section */}
      <Container className="featured-news">
        <h2 className="section-title">Latest News</h2>
        <Row className="g-4">
          {news.map((item, index) => (
            <Col key={index} md={4}>
              <Card className="news-card">
                <div className="news-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                <Card.Body>
                  <div className="news-meta">
                    <span className="news-date">{item.date}</span>
                    <span className="news-category">{item.category}</span>
                  </div>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="outline-primary" className="read-more-btn">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Upcoming Events Section */}
      <div className="events-section">
        <Container>
          <h2 className="section-title">Upcoming Events</h2>
          <Row className="g-4">
            {events.map((event, index) => (
              <Col key={index} md={4}>
                <Card className="event-card">
                  <Card.Body>
                    <div className="event-date">
                      <span className="day">{new Date(event.date).getDate()}</span>
                      <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <Card.Title>{event.title}</Card.Title>
                    <div className="event-details">
                      <p><i className="far fa-clock"></i> {event.time}</p>
                      <p><i className="far fa-map-marker-alt"></i> {event.location}</p>
                    </div>
                    <Card.Text>{event.description}</Card.Text>
                    <Button variant="primary" className="register-btn">
                      Register
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter to receive the latest news and event updates directly in your inbox.</p>
            </Col>
            <Col md={6}>
              <Form className="newsletter-form">
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Enter your email address" />
                </Form.Group>
                <Button variant="primary" type="submit" className="subscribe-btn">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default NewsEvents; 