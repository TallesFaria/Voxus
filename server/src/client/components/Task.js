import React from "react";

export default ({ task }) => (
  <div key={task.id}>
    <li>{task.taskName}</li>
    <button>
      <i className="material-icons">edit</i>
    </button>
    <button>
      <i className="material-icons">delete_forever</i>
    </button>
  </div>
);
