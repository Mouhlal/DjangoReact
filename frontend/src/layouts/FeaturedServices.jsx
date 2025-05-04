import React from 'react';

const services = [
  {
    icon: 'bi-activity',
    title: 'Lorem Ipsum',
    text: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
    delay: 100,
  },
  {
    icon: 'bi-bounding-box-circles',
    title: 'Sed ut perspici',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
    delay: 200,
  },
  {
    icon: 'bi-calendar4-week',
    title: 'Magni Dolores',
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
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