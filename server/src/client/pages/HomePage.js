import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTasks, createTask } from "../actions";
import { Helmet } from "react-helmet";
import CreateTask from "../components/CreateTask";
import Task from "../components/Task";

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  renderTasks() {
    if (this.props.tasks.data) {
      return this.props.tasks.data.map(task => {
        return <Task task={task} key={task.id} />
      });
    }
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.tasks.length} tasks Loaded`}</title>
        <meta property="og:title" content="tasks App" />
      </Helmet>
    );
  }

  handleSubmit(values) {
    console.log("===============SUBMIT=================");
    console.log(values);
    console.log("====================================");
  }

  render() {
    return (
      <div className="container">
        {this.head()}
        <CreateTask handleSubmit={this.handleSubmit.bind(this)} />
        Here's a big list of tasks:
        <ul>{this.renderTasks()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks, auth: state.auth };
}

function loadData(store) {
  return store.dispatch(fetchTasks());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchTasks, createTask })(HomePage)
};
