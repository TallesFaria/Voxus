import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  updateTask,
  deleteTask,
  isDone,
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
      task: { id, description, priority, name, done },
      isDone,
      updateTask,
      deleteTask,
      i
    } = this.props;

    return (
      <div key={id} className="horizontal">
        <br />
        {done ? (
          <button className="btn" onClick={() => isDone(id, done)}>
           <h6>
              <del>{name}</del>
            </h6>
          </button>
        ) : (
          <button className="btn" onClick={() => isDone(id, done)}>
            <h6>{name}</h6>
          </button>
        )}
        <br />
        <p>{description}</p>
        <p>
          <strong>Priority </strong>
          {priority}
        </p>
        <br />
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
  isDone,
  uploadDocumentRequest
})(Task);
