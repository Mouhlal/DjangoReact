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
            <h1>Solutions innovantes pour Absencia</h1>
            <p>Nous sommes une équipe de développeurs spécialisés dans la création d'applications web pour la gestion des absences, des présences et des alertes scolaires, avec des interfaces modernes et performantes.</p>

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
