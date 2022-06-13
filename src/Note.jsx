import { useState } from "react";
function Note({ title, success, index, deleteNote, updateNote }) {
  const [renderSuccess, setRenderSuccess] = useState(success);

  return (
    // Если заметка выполнена то она зачеркивается
    <div className={`note ${renderSuccess ? "ready" : ""}`}>
      <p>
        <button className="delete" onClick={() => deleteNote(index)}>
          &times;
        </button>
        {title}
      </p>
      <button
        className="completed"
        // Изменение выполнения заметки
        onClick={() => {
          updateNote(index);
          setRenderSuccess(!renderSuccess);
        }}
      >
        {
          // Если заметка выполнена то меняется название кнопки на "Отменить"
          renderSuccess ? "Отменить" : "Выполнить"
        }
      </button>
    </div>
  );
}

export default Note;
