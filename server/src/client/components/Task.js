import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateTask,
  deleteTask,
  done,
  uploadDocumentRequest
} from "../actions";

class Task extends Component {
  handleFileUpload(e) {
    e.preventDefault();
    this.props.uploadDocumentRequest({
      file: e.target.files[0],
      name: e.target.files[0].name,
      id: this.props.id
    });

    // this.props.uploadDocumentRequest(e.target.files);
  }

  render() {
    const { task, id, done, updateTask, deleteTask } = this.props;

    return (
      <div key={id} className="horizontal">
        <br />
        {task.done ? (
          <button className="btn" onClick={() => done(id, task.done)}>
            <h6>
              <del>{task.name}</del>
            </h6>
          </button>
        ) : (
          <button className="btn" onClick={() => done(id, task.done)}>
            <h6>{task.name}</h6>
          </button>
        )}
        <hr />
        <br />
        <li>{task.description}</li>
        <li>{task.priority}</li>
        <br />
        <button className="btn">
          <i className="material-icons">edit</i>
        </button>
        <button className="btn">
          <input type="file" onChange={this.handleFileUpload.bind(this)} />
        </button>

        <button className="btn red" onClick={() => deleteTask(id)}>
          <i className="material-icons">delete_forever</i>
        </button>
      </div>
    );
  }
}

export default connect(null, {
  updateTask,
  deleteTask,
  done,
  uploadDocumentRequest
})(Task);
