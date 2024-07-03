import React, { useState, useEffect } from 'react';                                        //React importieren 
import {PlusSquareOutlined }                                                               //Button für hinzufügen implementieren
from '@ant-design/icons';
import {CheckOutlined}                                                                     //Button für wieder löschen implementieren
from '@ant-design/icons';
import {DeleteOutlined}                                                                    //Button für wieder löschen implementieren
from '@ant-design/icons';
import {Divider, List, Button, Input, Space, Typography} from 'antd';
const {Title} = Typography;

import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [archivedItems, setArchivedItems] = useState([]);

  const { Search } = Input;
  
  

  useEffect(() => {                       
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];        
    const savedArchivedItems = JSON.parse(localStorage.getItem('archivedItems')) || [];     // lädt die archivierten Elemte aus Local Storage in "savedArchivedItems"
    setItems(savedItems);
    setArchivedItems(savedArchivedItems);                                                   //aktualisiert archivedItems State mit den gespeicherten daten 
  }, []);

  const handleChange = (e) => {                                                             // Funktion bei änderung des Eingabefeldes
    setInputValue(e.target.value);                                                          //e.target.value ist der Wert des Eingabefeldes und wird gesetzt
  };

  const handleSubmit = (value) => {                                                             //Funktion die beim abschicken des Formulars abgerufen wird
    // e.preventDefault();                                                                     //Verhindert Standartverhalten / also neuladen der Seite
    if (value.trim()) {                                                                // das .trim entfernt Leerzeichen am Anfang 
      const newItems = [...items, value];                                              //Array was die Elemente enthält
      setItems(newItems);       
      console.log(items);                                                         //Setzt eingabefeld zurück 
      localStorage.setItem('items', JSON.stringify(newItems));                              //speichert die Erste Liste( offene To Do's) im local Storage
    }
    setInputValue('');
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
    <>
      <Title  >Meine ToDo-Liste</Title>
      <Search placeholder="input search text" onSearch={handleSubmit} enterButton={<PlusSquareOutlined/>} allowClear value={inputValue} onChange={handleChange}/>
      <Title level={2} type="success">offene ToDo's</Title>

      <List
        size="large"
        bordered
        dataSource={items}
        renderItem={(items,index) => <List.Item 
            actions={[ <Button type="primary" key="checker" shape="circle" icon={<CheckOutlined />} onClick={() => handleArchive(index)}/>]}
            >{items}</List.Item>}
      />
      
      
      
      <Title level={2} type="danger">abgeschlossene ToDo's</Title>
      <List
        size="large"
        
        bordered
        dataSource={archivedItems}
        renderItem={(items,index) => <List.Item 
            actions={[ <Button type="primary" key="checker" shape="circle" icon={<DeleteOutlined />} onClick={() => handleDeleteArchived(index)}/>]}
            >{items}</List.Item>}
      />

    </>
  );
}

export default App;
