import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTask, fetchTask } from '../actions';
import FormTask from '../components/FormTask';

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.editTask(this.state);
  }

  render() {
    if (this.props.task) {
      return <FormTask task={this.props.task} onSubmit={this.handleSubmit} />;
    }
    return <div />;
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
  component: connect(null, { editTask, fetchTask })(EditPage),
};
