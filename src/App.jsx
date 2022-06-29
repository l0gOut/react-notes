import React, { useState, useEffect } from "react";
import Note from "./Note.jsx";
import "./App.scss";

function App() {
  const [theme, setTheme] = useState("light");
  const [newNote, setNewNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [search, setSearch] = useState("");
  console.log(navigator.geolocation.getCurrentPosition());

  useEffect(() => {
    // Определение заметок
    const notes = JSON.parse(localStorage.getItem("notes"));

    if (notes) setNotesList(notes);
    else setNotesList([{ title: "Базовая заметка", success: false }]);

    // Определение темы
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const storageTheme = localStorage.getItem("theme");

    if (!storageTheme) {
      if (prefersDarkScheme.matches) setTheme("dark");
    } else setTheme(storageTheme);
  }, []);

  function deleteNote(index) {
    notesList.splice(index, 1);

    const newNotesList = [...notesList];

    if (newNotesList.length === 0) localStorage.removeItem("notes");
    else localStorage.setItem("notes", JSON.stringify(newNotesList));

    setNotesList(newNotesList);
  }

  function addNote() {
    if (newNote) {
      const newNotesList = [...notesList, { title: newNote, success: false }];

      localStorage.setItem("notes", JSON.stringify(newNotesList));
      setNotesList(newNotesList);
      setNewNote("");
    }
  }

  function updateNote(index) {
    const newNotesList = notesList;
    newNotesList.splice(index, 1, {
      title: notesList[index].title,
      success: !notesList[index].success,
    });

    localStorage.setItem("notes", JSON.stringify(newNotesList));
    setNotesList(newNotesList);
  }

  return (
    <div className={`app ${theme}`}>
      <div className="app-body">
        <div className="header">
          <h1>Заметки</h1>
          <div className="container-theme">
            <button
              // Изменение значения темы при клике на значок
              onClick={() => {
                const nowTheme = theme === "light" ? "dark" : "light";
                localStorage.setItem("theme", nowTheme);
                setTheme(nowTheme);
              }}
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
                    updateNote={updateNote}
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
                  updateNote={updateNote}
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
