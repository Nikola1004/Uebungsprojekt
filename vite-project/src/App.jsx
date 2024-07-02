import React, { useState, useEffect } from 'react';                                        //React importieren 
import {PlusSquareOutlined }                                                               //Button für hinzufügen implementieren
from '@ant-design/icons';
import {CheckOutlined}                                                                     //Button für wieder löschen implementieren
from '@ant-design/icons';
import {DeleteOutlined}                                                                    //Button für wieder löschen implementieren
from '@ant-design/icons';

import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [archivedItems, setArchivedItems] = useState([]);

  useEffect(() => {                       
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];        
    const savedArchivedItems = JSON.parse(localStorage.getItem('archivedItems')) || [];     // lädt die archivierten Elemte aus Local Storage in "savedArchivedItems"
    setItems(savedItems);
    setArchivedItems(savedArchivedItems);                                                   //aktualisiert archivedItems State mit den gespeicherten daten 
  }, []);

  const handleChange = (e) => {                                                             // Funktion bei änderung des Eingabefeldes
    setInputValue(e.target.value);                                                          //e.target.value ist der Wert des Eingabefeldes und wird gesetzt
  };

  const handleSubmit = (e) => {                                                             //Funktion die beim abschicken des Formulars abgerufen wird
    e.preventDefault();                                                                     //Verhindert Standartverhalten / also neuladen der Seite
    if (inputValue.trim()) {                                                                // das .trim entfernt Leerzeichen am Anfang 
      const newItems = [...items, inputValue];                                              //Array was die Elemente enthält
      setItems(newItems);                                                                   //aktualisiert den State mit dem neuen Array
      setInputValue('');                                                                    //Setzt eingabefeld zurück 
      localStorage.setItem('items', JSON.stringify(newItems));                              //speichert die Erste Liste( offene To Do's) im local Storage
    }
  };

  const handleArchive = (index) => {                                                    //nimmt den Index des weiterleitenden Element
    const itemToArchive = items[index];                                                 //itemToArchiv Element was weitergeleitet wird.
    const newItems = items.filter((_, i) => i !== index);                               //Array was alle Elemente enthält bis auf die weitergeleiteten 
    const newArchivedItems = [...archivedItems, itemToArchive];                         //neues Array mit nur den Weitergeleiteten Elementen 
    setItems(newItems);                                                                 //setItem state aktualsiert mit den ersten to do s
    setArchivedItems(newArchivedItems);                                                 //setArchiveItems mit den weitergeleiteten Elementen 
    localStorage.setItem('items', JSON.stringify(newItems));                            //speichert die offnen to dos im local Storage
    localStorage.setItem('archivedItems', JSON.stringify(newArchivedItems));            // speichert die neue LIste 
  };

  const handleDeleteArchived = (index) => {                                             //nimmt parameter Index des Löschenden Elements
    const newArchivedItems = archivedItems.filter((_, i) => i !== index);               //newArchiveItem erstellt neues Array das alle bis auf den gelöschten Elemente enthölt                                                                                       
    setArchivedItems(newArchivedItems);                                                 //aktualisiert den archivedItem State it neuen Array
    localStorage.setItem('archivedItems', JSON.stringify(newArchivedItems));            //speichert neue Liste in Local Storage
  };  

  return (
    <div className="App">
      <h1> Meine ToDo- Liste</h1>
      <form onSubmit={handleSubmit}>                                                   {/* Funktion für den submit button vergeben  */} 
        <div className="eingabeFeld">
        <input 
          className="eingabe"
          type="text" 
          value={inputValue} 
          onChange={handleChange} 
          placeholder="Gib etwas ein" 
        />
        <button type="submit"><PlusSquareOutlined/></button>                          {/* der submit Button ein To Do zu erstellen   */ }
        </div>
      </form>
      <h2 className="offene" >offene To Do's</h2>
      <ul className ="hauptListe" >
        {items.map((item, index) => (                                                 /* Ein Array wir erstellt durch map-Methode, macht für jedes Element ein <li> */ 
          <li ckey={index}>                                                           {/* das Elemten von dem gespeicherten Array oben. mit dem Index */} 
            {item}                                                                    {/* Hier wird das Element das ausgegeben */}
            <button onClick={() => handleArchive(index)}><CheckOutlined/></button>    {/* Buttom um die offenen To Do's zu schließen */}
          </li>
        ))}
      </ul>
      <h2 className="geschlossen">Absgeschlossene To Do's</h2>
      <ul className="fertigeListe">
        {archivedItems.map((item, index) => (                                        /* neues Array wird erstellt mit den weitergeleiteten Elemente und in <li> weitergegeben  */
          <li key={index}>                                                           {/* Das Element im Array an der Stelle des Index  */}
            {item}                                                                   {/* Element */}
            <button onClick={() => handleDeleteArchived(index)}><DeleteOutlined/></button>    {/* Button um die erledigten To Do's zu löschen*/}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
