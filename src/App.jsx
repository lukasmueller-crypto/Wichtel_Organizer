import './App.css';
import { useState } from "react";
import { texts } from "./i18n";

export default function App() {
  const [lang, setLang] = useState("de");
  const T = texts[lang];

  const [participants, setParticipants] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [wishlistInput, setWishlistInput] = useState("");
  const [exclusionInput, setExclusionInput] = useState([]);

  const toggleLang = () => setLang(lang === "de" ? "en" : "de");

  const addParticipant = () => {
    if (!nameInput || !emailInput) return;
    setParticipants([
      ...participants,
      {
        id: Date.now(),
        name: nameInput,
        email: emailInput,
        wishlist: wishlistInput,
        excluded: exclusionInput,
      },
    ]);
    setNameInput("");
    setEmailInput("");
    setWishlistInput("");
    setExclusionInput([]);
  };

  const toggleExclusion = (name) => {
    setExclusionInput((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  const shuffleAssignments = () => {
    const n = participants.length;
    if (n < 2) return alert("Mindestens 2 Teilnehmer erforderlich.");

    let assignment = null;
    let attempts = 0;

    while (!assignment && attempts < 5000) {
      attempts++;

      let ring = [...participants].sort(() => Math.random() - 0.5);

      let valid = true;
      let pairings = [];

      for (let i = 0; i < n; i++) {
        const giver = ring[i];
        const receiver = ring[(i + 1) % n];

        if (giver.id === receiver.id) {
          valid = false;
          break;
        }
        if (giver.excluded.includes(receiver.name)) {
          valid = false;
          break;
        }
        pairings.push({ giver, receiver });
      }

      if (valid) assignment = pairings;
    }

    if (!assignment)
      return alert("Kein gültiger Kreis möglich – Ausschlüsse prüfen.");

    console.log("Assignments:", assignment);
    alert("Großer Kreis erfolgreich erstellt!");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <button onClick={toggleLang}>
        {lang === "de" ? "EN" : "DE"}
      </button>

      <h1>{T.title}</h1>

      <h2>{T.addParticipant}</h2>
      <input placeholder={T.name} value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
      <input placeholder={T.email} value={emailInput} onChange={(e)=>setEmailInput(e.target.value)}/>
      <textarea placeholder={T.wishlist} value={wishlistInput} onChange={(e)=>setWishlistInput(e.target.value)} />

      {participants.length > 0 && (
        <div>
          <p>{T.exclusions}:</p>
          {participants.map((p)=>(
            <button key={p.id} onClick={()=>toggleExclusion(p.name)}>
              {p.name}{exclusionInput.includes(p.name)?" ❌":""}
            </button>
          ))}
        </div>
      )}

      <button onClick={addParticipant}>{T.add}</button>

      <h2>{T.list}</h2>
      <ul>
        {participants.map((p)=>(
          <li key={p.id}>{p.name} – {p.email}</li>
        ))}
      </ul>

      {participants.length > 1 && (
        <button onClick={shuffleAssignments}>{T.assign}</button>
      )}
    </div>
  );
}
