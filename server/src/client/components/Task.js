import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateTask,
  deleteTask,
  done,
  uploadDocumentRequest
} from '../actions';
import {
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL
} from '../actions/types';

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

  uploadFile() {
    if (this.props.upload === UPLOAD_DOCUMENT_SUCCESS)
      return <div>Upload successfull</div>;
    if (this.props.upload === UPLOAD_DOCUMENT_FAIL)
      return <div>Upload failed</div>;
    return <div />;
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
        {this.uploadFile()}

        <button className="btn red" onClick={() => deleteTask(id)}>
          <i className="material-icons">delete_forever</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { upload: state.upload };
}

export default connect(mapStateToProps, {
  updateTask,
  deleteTask,
  done,
  uploadDocumentRequest
})(Task);
