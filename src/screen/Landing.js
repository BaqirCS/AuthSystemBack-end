import React from 'react';
import { Link } from 'react-router-dom';
import x from '../image/x.PNG';
function Landing() {
  return (
    <div style={{ marginBottom: '-18px' }}>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={x} className="d-block w-100" alt="First slide" />
            <div className="carousel-caption">
              <h5
                className="animated fadeInDown fadahossain"
                style={{ animationDelay: '1s' }}
              >
                REACT + NODE JS
              </h5>
              <p
                className="d-none d-md-block animated fadeInUp"
                style={{ animationDelay: '2s' }}
              >
                NodeJS is a framework of JavaScript which is mainly used for
                working with the backend of our application or building the
                backend using JavaScript, whereas ReactJS is a JavaScript
                front-end library. It is mainly used for building the user
                interface or the frontend of our application
              </p>
              <p className="animated fadeInUp" style={{ animationDelay: '3s' }}>
                <Link to="/login">Learn More</Link>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={x} alt="second slide" />
            <div className="carousel-caption">
              <h5
                className="animated fadeInDown fadahossain"
                style={{ animationDelay: '1s' }}
              >
                LOCAL STORAGE+COOKIES
              </h5>
              <p
                className="d-none d-md-block animated fadeInUp"
                style={{ animationDelay: '2s' }}
              >
                Local Storage allows you to read from and store data related to
                the user on the browser.Cookies are pieces of data that are
                communicated between the server and the browser in the header of
                requests.
              </p>
              <p className="animated fadeInUp" style={{ animationDelay: '3s' }}>
                <Link to="/login">Learn More</Link>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={x} alt="second slide" />
            <div className="carousel-caption">
              <h5
                className="animated fadeInDown fadahossain"
                style={{ animationDelay: '1s' }}
              >
                JSON WEB TOKEN
              </h5>
              <p
                className="d-none d-md-block animated fadeInUp"
                style={{ animationDelay: '2s' }}
              >
                JSON Web Tokens are an open, industry standard RFC 7519 method
                for representing claims securely between two parties.
              </p>
              <p className="animated fadeInUp" style={{ animationDelay: '3s' }}>
                <Link to="/login">Learn More</Link>
              </p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Landing;
