import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EleveList from './components/ElevesForm/EleveList'
import AddEleveForm from './components/ElevesForm/AddEleveForm'
import EditEleveForm from './components/ElevesForm/EditEleveForm'
import EleveDetails from './components/ElevesForm/EleveDetails'
import PresenceList from './components/PresencesForm/PresenceList'
import AddPresenceForm from './components/PresencesForm/AddPresenceForm'
import AlerteList from './components/AlertesForm/AlertesList';
import AllAlerts from './components/AlertesForm/AllAlerts';
import AllNotifications from './components/Notifications/AllNotifications';
import NotificationList from './components/Notifications/Notification';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EleveList />} />
        <Route path="ajouter-eleve/" element={<AddEleveForm />} />
        <Route path="/modifier-eleve/:id" element={<EditEleveForm />} />
        <Route path="/eleve/:id" element={<EleveDetails />} />

        <Route path="/eleve/:id/presences" element={<PresenceList />} />
        <Route path="/eleve/:id/ajouter-presence" element={<AddPresenceForm />} />
        <Route path='/presences' element={<PresenceList />} />

        <Route path="/eleve/:id/alertes" element={<AlerteList />} />
        <Route path="/alertes" element={<AllAlerts />} />

        <Route path='/notifications' element={<AllNotifications />} />
        <Route path="/eleve/:id/notifications" element={<NotificationList />} />    

        <Route path="*" element={<h1>Page non trouvée</h1>} />



      </Routes>
    </BrowserRouter>
  )
}
