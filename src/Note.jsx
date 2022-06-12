import { useState } from "react";

function Note({ title, success, index, deleteNote }) {
  const [currentSuccess, setSuccess] = useState(success);

  return (
    // Если заметка выполнена то она зачеркивается
    <div className={`note ${currentSuccess ? "ready" : ""}`}>
      <p>
        <button className="delete" onClick={() => deleteNote(index)}>
          &times;
        </button>
        {title}
      </p>
      <button
        className="completed"
        // Изменение выполнения заметки
        onClick={() => setSuccess(!currentSuccess)}
      >
        {
          // Если заметка выполнена то меняется название кнопки на "Отменить"
          currentSuccess ? "Отменить" : "Выполнить"
        }
      </button>
    </div>
  );
}

export default Note;
