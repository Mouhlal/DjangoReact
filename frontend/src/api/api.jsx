import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api/' });

export const getEleves = () => API.get('eleves/');
export const updateEleve  = (id, data) => API.put(`eleves/${id}/`, data);
export const deleteEleve = (id)   => API.delete(`eleves/${id}/`);

export const getFilieres = () => API.get('etudes/');
export const getGroupes   = (filiereId) => {
    // si filiereId n'est pas passé, renvoie tous les groupes
    const url = filiereId
      ? `groupes/?filiere_id=${filiereId}`
      : 'groupes/';
    return API.get(url);
  };export const addEleve    = (eleveData) => API.post('eleves/', eleveData);