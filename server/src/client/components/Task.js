import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateTask,
  deleteTask,
  isDone,
  uploadDocumentRequest
} from "../actions";
import {
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL
} from "../actions/types";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: this.props.task.done,
      name: this.props.task.name,
      description: this.props.task.description,
      priority: this.props.task.priority,
      createdBy: this.props.auth.googleId
    };
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.props.uploadDocumentRequest({
      file: e.target.files[0],
      name: e.target.files[0].name,
      id: this.props.id
    });
  }

  uploadFile() {
    if (this.props.upload === UPLOAD_DOCUMENT_SUCCESS)
      return <div>Upload successfull</div>;
    if (this.props.upload === UPLOAD_DOCUMENT_FAIL)
      return <div>Upload failed</div>;
    return <div />;
  }

  render() {
    const {
      task: { id, description, priority, name, done, createdBy },
      isDone,
      updateTask,
      deleteTask,
      auth,
      i
    } = this.props;

    return (
      <div className="row">
        <div className="col s12 m6 ">
          <div key={id} className="card cyan lighten-5 ">
            <br />
            {this.state.done ? (
              <button
                className="btn red"
                onClick={() => {
                  this.setState({ done: false });
                  isDone(i, done, id, auth);
                }}
              >
                <h6 style={{ textDecoration: "line-through" }}>
                  {this.state.name}
                </h6>
              </button>
            ) : (
              <h6>
                <button
                  className="btn"
                  onClick={() => {
                    this.setState({ done: true });
                    isDone(i, done, id, auth);
                  }}
                >
                  {this.state.name}
                </button>
              </h6>
            )}
            <br />
            <p>
              <strong>Description: </strong>
              {this.state.description}
            </p>
            <p className="flow-text">
              <strong>Priority: </strong>
              {this.state.priority}
            </p>
            <p>
              <strong>Created by: </strong>
              {this.state.createdBy}
            </p>
            <button className="btn">
              <input type="file" onChange={this.handleFileUpload.bind(this)} />
            </button>
            {this.uploadFile()}
            <br />
            <Link className="btn" to={`/edit/${id}`}>
              <i className="material-icons">edit</i>
            </Link>
            <button className="btn red" onClick={() => deleteTask(i)}>
              <i className="material-icons">delete_forever</i>
            </button>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { upload: state.upload, auth: state.auth };
}

export default connect(mapStateToProps, {
  updateTask,
  deleteTask,
  isDone,
  uploadDocumentRequest
})(Task);
