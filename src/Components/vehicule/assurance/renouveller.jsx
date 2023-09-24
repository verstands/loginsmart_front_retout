import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InsuranceManagement() {
  const [polices, setPolices] = useState([]);
  const [selectedPolice, setSelectedPolice] = useState(null);
  const [vehicules, setVehicules] = useState([]);

  useEffect(() => {
    // Récupérer les polices d'assurance lors du chargement du composant
    axios.get('/polices')
      .then(response => {
        setPolices(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Récupérer les véhicules associés à la police sélectionnée
    if (selectedPolice) {
      axios.get(`/polices/${selectedPolice}/vehicules`)
        .then(response => {
          setVehicules(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setVehicules([]);
    }
  }, [selectedPolice]);

  const handlePoliceChange = (event) => {
    setSelectedPolice(event.target.value);
  };

  const handleMoveVehicle = (event) => {
    // Logique pour déplacer les véhicules entre les listes
  };

  const handleSubmit = (event) => {
    // Logique pour soumettre le formulaire
    event.preventDefault();
    // ...
  };

  const handleDateClick = () => {
      
  }

  return (
    <div>
      <h1>Renouvellement d'assurance pour une police</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="police">Police :</label>
          <select id="police" value={selectedPolice} onChange={handlePoliceChange}>
            <option value="">-- Choisissez --</option>
            {polices.map(police => (
              <option key={police.id} value={police.id}>{police.nom_contr}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dispo">Véhicules disponibles :</label>
                    <select id="dispo" size="10" multiple>
            {vehicules.map(vehicule => (
              <option key={vehicule.id} value={vehicule.id}>{vehicule.nom}</option>
            ))}
          </select>
        </div>

        <div>
          <button onClick={handleMoveVehicle}>&gt;</button>
          <button onClick={handleMoveVehicle}>&gt;&gt;</button>
          <button onClick={handleMoveVehicle}>&lt;</button>
          <button onClick={handleMoveVehicle}>&lt;&lt;</button>
        </div>

        <div>
          <label htmlFor="choix">Véhicules sélectionnés :</label>
          <select id="choix" size="10" multiple>
            {/* Affiche les véhicules sélectionnés */}
          </select>
        </div>

        <div>
          <label htmlFor="dateffet">Date effet :</label>
          <input type="text" id="dateffet" onClick={handleDateClick} readOnly />
        </div>

        <div>
          <label htmlFor="echeance">Échéance :</label>
          <input type="number" id="echeance" />
        </div>

        <div>
          <input type="submit" value="Renouveler" />
        </div>
      </form>
    </div>
  );
}

export default InsuranceManagement;