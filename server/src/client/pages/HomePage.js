import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, createTask } from '../actions';
import { Helmet } from 'react-helmet';
import CreateTask from '../components/CreateTask';
import Task from '../components/Task';

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.tasks.length} tasks Loaded`}</title>
        <meta property="og:title" content="tasks App" />
      </Helmet>
    );
  }

  renderTasks() {
    if (this.props.tasks) {
      return this.props.tasks.map((task, i) => {
        return <Task task={task} key={i} i={i} />;
      });
    }
  }

  render() {
    return (
      <div className="container">
        {this.head()}
        <CreateTask />
        <h2>List of Tasks:</h2>
        <h6>Click to change the task status</h6>
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
