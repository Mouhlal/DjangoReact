import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EleveList from './components/EleveList';
import AddEleveForm from './components/AddEleveForm';
import EditEleveForm from './components/EditEleveForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EleveList />} />
        <Route path="ajouter-eleve/" element={<AddEleveForm />} />
        <Route path="/modifier-eleve/:id" element={<EditEleveForm />} />

      </Routes>
    </BrowserRouter>
  )
}
