import React, { useState } from 'react';
import './App.css';

function App() {
  const [participants, setParticipants] = useState([]);
  const [inputName, setInputName] = useState('');
  const [assignments, setAssignments] = useState([]);

  // Teilnehmer hinzufügen
  const addParticipant = () => {
    if (inputName.trim() && !participants.includes(inputName.trim())) {
      setParticipants([...participants, inputName.trim()]);
      setInputName('');
    }
  };

  // Wichtel-Zuordnung (keine Kreise)
  const assignGifts = () => {
    if (participants.length < 2) return;

    const names = [...participants];
    const shuffled = [...names].sort(() => Math.random() - 0.5);

    const result = shuffled.map((name, index) => ({
      giver: name,
      receiver: shuffled[(index + 1) % shuffled.length],
    }));

    setAssignments(result);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎁 Wichtel Organizer</h1>
      </header>

      <div className="person-card">
        <h3>Teilnehmer hinzufügen</h3>
        <input
          type="text"
          value={inputName}
          placeholder="Name eingeben"
          onChange={(e) => setInputName(e.target.value)}
        />
        <button onClick={addParticipant} disabled={!inputName.trim()}>
          Hinzufügen
        </button>
      </div>

      <div className="person-card">
        <h3>Teilnehmerliste</h3>
        {participants.length === 0 && <p>Keine Teilnehmer bisher.</p>}
        <ul>
          {participants.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      <button onClick={assignGifts} disabled={participants.length < 2}>
        Wichtel zuweisen
      </button>

      {assignments.length > 0 && (
        <div className="result-box">
          <h3>Wichtel-Zuordnung</h3>
          <ul>
            {assignments.map((a, i) => (
              <li key={i}>
                <span className="gift-icon">🎁</span>
                {a.giver} → {a.receiver}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
