import React from 'react';

const servicesData = [
  {
    icon: 'bi-people-fill',
    title: 'Gestion des élèves',
    description: "Ajoutez, modifiez et supprimez facilement vos élèves.",
    delay: 100,
  },
  {
    icon: 'bi-calendar-check-fill',
    title: 'Suivi des présences',
    description: "Enregistrez la présence par matière et séance, visualisez les absences.",
    delay: 200,
  },
  {
    icon: 'bi-bell-fill',
    title: "Alertes d'absence",
    description: "Générez des alertes automatiques et notifiez les parents en temps réel.",
    delay: 300,
  },
  {
    icon: 'bi-file-earmark-pdf-fill',
    title: 'Rapports PDF',
    description: "Exportez les présences et absences au format PDF pour un suivi complet.",
    delay: 400,
  },
  {
    icon: 'bi-bar-chart-fill',
    title: 'Statistiques',
    description: "Consultez les statistiques de présence par élève et par matière.",
    delay: 500,
  },
  {
    icon: 'bi-gear-fill',
    title: 'Configuration',
    description: "Paramétrez vos filières, groupes et matières en toute simplicité.",
    delay: 600,
  },
];

export default function Services() {
  return (
    <section id="services" className="services section light-background">
      <div className="container section-title" data-aos="fade-up">
        <span>Services</span>
        <h2>Services</h2>
        <p>Découvrez les fonctionnalités clés de votre gestion des absences</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {servicesData.map((svc, idx) => (
            <div
              key={idx}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={svc.delay}
            >
              <div className="service-item position-relative h-100 p-4 text-center">
                <div className="icon mb-3">
                  <i className={`bi ${svc.icon} fs-1 text-primary`}></i>
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
