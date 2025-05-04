import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="hero section d-flex align-items-center">
      <div className="container">
        <div className="row gy-4">
          <div
            className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
            data-aos="fade-up"
          >
            <h1>Elegant and creative solutions</h1>
            <p>We are team of talented designers making websites with Bootstrap</p>
            <div className="d-flex">
              <a href="#about" className="btn-get-started">Get Started</a>
            </div>
          </div>
          <div
            className="col-lg-6 order-1 order-lg-2 hero-img"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <img
              src="/assets/img/hero-img.png"
              className="img-fluid animated"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
