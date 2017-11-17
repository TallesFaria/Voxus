import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTask, fetchTask } from '../actions';
import FormTask from '../components/FormTask';

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
  }

  handleSubmit(update) {
    this.props.updateTask({...update, id: this.props.task.id});
  }

  renderEdit() {
    if (this.props.task) {
      return <FormTask task={this.props.task} onSubmit={this.handleSubmit} />;
    }
    return <div />;
  }

  render() {
    return (
      <div className="container">
        {this.renderEdit()}

        <div className="form-group">
          <Link to="/">
            <button className="btn red">Cancel</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { task: state.task };
}

function loadData(store, path) {
  const id = path.slice(0, 5);
  console.log('================ID=================');
  console.log(id);
  console.log('====================================');
  return store.dispatch(fetchTask(id));
}

export default {
  loadData,
  component: connect(mapStateToProps, { updateTask, fetchTask })(EditPage)
};
