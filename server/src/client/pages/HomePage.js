import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions';
import { Helmet } from 'react-helmet';

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  renderTasks() {
    return this.props.tasks.map(task => {
      return <li key={task.id}>{task.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.tasks.length} tasks Loaded`}</title>
        <meta property="og:title" content="tasks App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's a big list of tasks:
        <ul>{this.renderTasks()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

function loadData(store) {
  return store.dispatch(fetchTasks());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchTasks })(HomePage)
};
