import React, { useState } from 'react';
import AddPresenceForm from '../PresencesForm/AddPresenceForm';
import PresenceList from '../PresencesForm/PresenceList';
const EleveDetails = ({ eleveId }) => {
  const [updatePresence, setUpdatePresence] = useState(false);

  const handlePresenceAdded = () => {
    setUpdatePresence(!updatePresence); // Trigger re-fetch of data
  };

  return (
    <div>
      <h1>Détails de l'Élève</h1>

      <AddPresenceForm
        eleveId={eleveId}
        onPresenceAdded={handlePresenceAdded}
      />

      <PresenceList
        eleveId={eleveId}
      />
    </div>
  );
};

export default EleveDetails;
