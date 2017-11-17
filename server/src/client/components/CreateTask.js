import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../actions';
import FormTask from './FormTask';

class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ taskName, description }) {
    if (taskName || description) {
      this.props.createTask({ taskName, description });
    }
  }

  render() {
    const task = {
      taskName: '',
      description: '',
      priority: ''
    };
    return <FormTask task={task} onSubmit={this.handleSubmit} />;
  }
}

export default connect(null, { createTask })(CreateTask);
