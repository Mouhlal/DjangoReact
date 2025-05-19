import React from 'react';

const services = [
  {
    icon: 'bi-person-check',
    title: 'Gestion des absences',
    text: 'Suivi des absences des élèves avec des alertes et notifications en temps réel.',
    delay: 100,
  },
  {
    icon: 'bi-journal-check',
    title: 'Gestion des présences',
    text: 'Enregistrement des présences et consultation de l\'historique par les enseignants et les élèves.',
    delay: 200,
  },
  {
    icon: 'bi-calendar-day',
    title: 'Suivi des emplois du temps',
    text: 'Consultation et gestion des emplois du temps des élèves et des enseignants.',
    delay: 300,
  },
];

const FeaturedServices = () => {
  return (
    <section id="featured-services" className="featured-services section">
      <div className="container">
        <div className="row gy-4">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="col-lg-4 d-flex"
              data-aos="fade-up"
              data-aos-delay={svc.delay}
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className={`bi ${svc.icon} icon`}></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    {svc.title}
                  </a>
                </h4>
                <p>{svc.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
