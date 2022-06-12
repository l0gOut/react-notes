import React, { useState, useEffect } from "react";
import Note from "./Note";
import "./App.scss";

function App() {
  const [theme, setTheme] = useState("light");
  const [newNote, setNewNote] = useState("");
  const [notesList, setNotesList] = useState([
    {
      title: "Базовая заметка!",
      success: false,
    },
  ]);
  const [search, setSearch] = useState("");

  function deleteNote(index) {
    notesList.splice(index, 1);
    setNotesList([...notesList]);
  }

  function addNote() {
    if (newNote) {
      setNotesList([...notesList, { title: newNote, success: false }]);
      setNewNote("");
    }
  }

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (prefersDarkScheme.matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [prefersDarkScheme.matches]);

  return (
    <div className={`app ${theme}`}>
      <div className="app-body">
        <div className="header">
          <h1>Заметки</h1>
          <div className="container-theme">
            <button
              // Изменение значения темы при клике на значок
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              name="theme"
            >
              {theme === "light" ? "Тёмная тема" : "Светлая тема"}
            </button>
          </div>
        </div>
        <input
          onChange={e => setSearch(e.target.value)}
          value={search}
          placeholder="Найти..."
          type="text"
          name="search"
        />
        <div className="notes">
          {notesList.map((value, index) => {
            if (search) {
              if (value.title.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <Note
                    title={value.title}
                    success={value.success}
                    deleteNote={deleteNote}
                    index={index}
                    key={index}
                  />
                );
              }

              return false;
            } else {
              return (
                <Note
                  title={value.title}
                  success={value.success}
                  deleteNote={deleteNote}
                  index={index}
                  key={index}
                />
              );
            }
          })}
          <div className="note create">
            <textarea
              placeholder="Введите новую заметку..."
              onChange={e => setNewNote(e.target.value)}
              value={newNote}
            ></textarea>
            <button onClick={() => addNote()}>Создать</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
