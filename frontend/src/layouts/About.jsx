// src/components/About.jsx
import React from 'react';

const About = () => (
  <section id="about" className="about section">
    <div className="container section-title" data-aos="fade-up">
      <span>À propos<br/></span>
      <h2>Qui sommes-nous ?</h2>
      <p>
        Absencia plateforme de gestion des absences scolaires offrant un suivi précis
        des présences, alertes automatiques et rapports complets.
      </p>
    </div>
    <div className="container">
      <div className="row gy-4">
        <div
          className="col-lg-6 position-relative align-self-start"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <img
            src="/assets/img/about.png"
            className="img-fluid"
            alt="À propos"
          />
        </div>
        <div
          className="col-lg-6 content"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3>Gérez vos présences en toute simplicité</h3>
          <p className="fst-italic">
            Notre solution permet d'enregistrer les présences par séance et matière,
            de suivre les absences, d'envoyer automatiquement des notifications aux parents
            et de générer des rapports PDF.
          </p>
          <ul>
            <li>
              <i className="bi bi-check2-all"></i>
              <span>Suivi des présences et des absences</span>
            </li>
            <li>
              <i className="bi bi-check2-all"></i>
              <span>Alertes automatiques au seuil d'absences</span>
            </li>
            <li>
              <i className="bi bi-check2-all"></i>
              <span>Rapports détaillés au format PDF</span>
            </li>
          </ul>
          <p>
            Flexible et intuitif, notre outil s'adapte à vos filières, groupes et matières
            pour un pilotage optimal de votre établissement.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
