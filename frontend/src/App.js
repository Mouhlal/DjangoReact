import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EleveList from './components/EleveList';
import AddEleveForm from './components/AddEleveForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EleveList />} />
        <Route path="eleves/" element={<AddEleveForm />} />
        
      </Routes>
    </BrowserRouter>
  )
}
