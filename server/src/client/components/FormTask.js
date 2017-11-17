import React, { Component } from 'react';

class FormTask extends Component {
  constructor(props) {
    super(props);
    console.log('===============CONSTRUCTOR==================');
    console.log(props);
    console.log('====================================');
    this.state = {
      taskName: props.task.taskName,
      description: props.task.description,
      priority: props.task.priority
    };
    console.log('===========STATE======================')
    console.log(this.state)
    console.log('====================================')

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      taskName: '',
      description: '',
      priority: ''
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-6 col-md-offset-3">
          
          <form name="form" onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                className="form-control"
                name="taskName"
                value={this.state.taskName}
                onChange={this.handleChange}
                placeholder="Task Name"
              />
            </div>
            <div>
              <br />
              <input
                type="text"
                className="form-control"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="description"
              />
            </div>
            <div>
              <br />
              <input
                type="text"
                className="form-control"
                name="priority"
                value={this.state.priority}
                onChange={this.handleChange}
                placeholder="Priority"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FormTask;