import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api/' });

export const getEleves = () => API.get('eleves/');
export const getEleveDetail = (eleveId) => API.get(`eleves/${eleveId}/`);
export const getEleve = (id) => API.get(`eleves/${id}/`);
export const updateEleve  = (id, data) => API.put(`eleves/${id}/`, data);
export const deleteEleve = (id)   => API.delete(`eleves/${id}/`);
export const addEleve    = (eleveData) => API.post('eleves/', eleveData); 

export const getElevesByGroupe = (groupeId) =>
  API.get(`eleves/?groupe=${groupeId}`);

export const getFilieres = () => API.get('etudes/');
export const getGroupes   = (filiereId) => {
    const url = filiereId ? `groupes/?filiere_id=${filiereId}` : 'groupes/';
    return API.get(url);
  };

  
export const getMatieres = (filiereId) => {
  const url = filiereId
    ? `matieres/?filiere_id=${filiereId}`
    : 'matieres/';
  return API.get(url);
};

export const getPresences = (eleveId) => API.get(`presences/?eleve=${eleveId}`);
export const addPresence = (data) => API.post('presences/', data);
export const getAllPresences = () => API.get('presences/');
export const deletePresence = (id) => API.delete(`presences/${id}/`);

export const getAlertes = (eleveId) => API.get(`alertes/?eleve=${eleveId}`);
export const deleteAlerte   = (id)      => API.delete(`alertes/${id}/`);
export const getAllAlertes  = ()        => API.get('alertes/'); 


export const getNotifications    = (eleveId) => API.get(`notifications/?eleve=${eleveId}`);
export const deleteNotification  = (id)      => API.delete(`notifications/${id}/`);
export const getAllNotifications = ()        => API.get('notifications/');


