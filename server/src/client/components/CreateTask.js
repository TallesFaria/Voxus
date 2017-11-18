import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../actions";
import FormTask from "./FormTask";

class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ taskName, description, priority }) {
    if (taskName || description || priority) {
      this.props.createTask({ taskName, description, priority, createBy: this.props.auth });
    }
  }

  render() {
    const task = {
      taskName: "",
      description: "",
      priority: ""
    };
    return <FormTask task={task} onSubmit={this.handleSubmit} />;
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(null, { createTask })(CreateTask);
