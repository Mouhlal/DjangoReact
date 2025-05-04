import React from 'react';

const statsData = [
  { end: 232, label: 'Clients' },
  { end: 521, label: 'Projects' },
  { end: 1453, label: 'Hours Of Support' },
  { end: 32, label: 'Workers' },
];

const Stats = () => {
  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {statsData.map((item, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  className="purecounter"
                  data-purecounter-start="0"
                  data-purecounter-end={item.end}
                  data-purecounter-duration="1"
                ></span>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
