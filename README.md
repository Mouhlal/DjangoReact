📘 Absencia

**Absencia** est une application web complète pour la **gestion des absences scolaires**. Elle permet de suivre les présences des élèves, de générer des rapports d’absences, et d’alerter automatiquement les parents en cas d’absences répétées.

## 🎯 Objectifs du projet

* Suivi des absences par matière, date et séance.
* Génération de rapports d’absences en PDF.
* Alerte automatique envoyée aux parents selon le nombre d’absences.
* Interface intuitive pour les administrateurs et enseignants.

## 🧰 Technologies utilisées

### 🔧 Backend

* [Django](https://www.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) pour l’authentification

### 💻 Frontend

* [React.js](https://reactjs.org/)
* [Axios](https://axios-http.com/) pour les requêtes API
* [React Router](https://reactrouter.com/) pour la navigation

### 🗄️ Base de données

* SQLite (en développement)

## 🧩 Fonctionnalités principales

* CRUD des étudiants, matières, groupes et filières
* Gestion des présences par élève et par séance
* Alertes automatiques en cas d’absence
* Génération et téléchargement des rapports en PDF
* Authentification par jeton JWT 

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Mouhlal/Absencia.git
cd Absencia
```

### 2. Backend (Django)

```bash
cd backend
python -m venv env
source venv/bin/activate  # ou venv\Scripts\activate sous Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

## 📷 Aperçu

![Page d’acceuil ](screen/home.png)

![Gestion d'éleve ](screen/eleve.png)

![Page de presence](screen/absence.png)

![image](https://github.com/user-attachments/assets/f0165197-164b-4266-b61b-db7d514b6627)# 


## 👨‍💻 Auteur

* Mouhlal Ayoub


