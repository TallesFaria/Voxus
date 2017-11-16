import React, { Component } from "react";

class Task extends Component {
  render() {
    const { task } = this.props;
    return (
      <div key={task.id} className="horizontal">
        <br />
        {task.done ? <h6><del>{task.taskName}</del></h6> : <h6>{task.taskName}</h6>}
        <li>{task.description}</li>
        <button className="btn">
          <i className="material-icons">edit</i>
        </button>
        <button className="btn blue">
          <i className="material-icons">attach_file</i>
        </button>
        <button className="btn red">
          <i className="material-icons">delete_forever</i>
        </button>
      </div>
    );
  }
}

export default Task;