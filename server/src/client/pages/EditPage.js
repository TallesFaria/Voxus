import React, { Component } from 'react';

class EditPage extends Component {
  getInitialState() {
    return {
      todos: [{ task: 'Item 1' }],
      editorText: '',
      itemBeingEdited: 2
    };
  }

  textBeingEdited() {
    let store = this.state;
    let x = store.todos[store.itemBeingEdited];
    return x ? x.task : '';
  }

  buttonText() {
    let store = this.state;
    return store.itemBeingEdited < store.todos.length ? 'Save' : 'Add';
  }

  editorIsEmpty() {
    let store = this.state;
    return store.editorText === '';
  }

  onAddItem() {
    let store = this.state;
    if (state.itemBeingEdited > state.todos.length) {
      console.log('Adding');
      this.setState({
        todos: store.todos.push({ task: this.editorText }),
        itemBeingEdited: store.itemBeingEdited + 1,
        editorText: ''
      });
    } else {
      console.log('Saving');
      store.todos[store.itemBeingEdited].tast = store.editorText;
      this.setState({
        todos: store.todos,
        editorText: '',
        itemBeingEdited: store.todos.length + 1
      });
    }
  }

  onDeleteItem(i) {
    let store = this.state;
    store.todos.splice(i, 1);
    if (store.itemBeingEdited === i) {
      this.setState({
        itemBeingEdited: store.todos.length + 1,
        editorText: '',
        todos: todos
      });
    }
  }

  onEditItem(i) {
    let store = this.state;
    this.setState({
      itemBeingEdited: i,
      editorText: this.textBeingEdited()
    });
  }

  render() {
    let store = this.state;
    return (
      <div>
        <TextEditor store={store} />
        <ListGroup store={store} />
      </div>
    );
  }
}

const ListItem = props => {
  console.log('Rendering ListItem');
  return (
    <li className="list-group-item clearfix constraint">
      <span className="pull-left">{props.todo.task}</span>
      <span className="pull-right">
        <div className="btn-group">
          <button
            className="btn btn-danger btn-xs delete"
            onClick={props.deleteItem}
          >
            x
          </button>
          <button
            className="btn btn-success btn-xs edit"
            onClick={props.editItem}
          >
            -
          </button>
        </div>
      </span>
    </li>
  );
};

const ListGroup = ({ store }) => {
  console.log('Rendering ListGroup');
  const listItem = (d, i) => (
    <ListItem
      key={i}
      todo={d}
      deleteItem={e => store.onDeleteItem(i)}
      editItem={e => store.onEditItem(i)}
    />
  );
  return <ul className="list-group">{store.todos.map(listItem)}</ul>;
};

const TextEditor = ({ store }) => {
  console.log('Rendering TextEditor');
  return (
    <div className="editor">
      <h4>Constraint Editor</h4>
      <textarea
        className="form-control"
        value={store.editorText}
        onChange={e => (store.editorText = e.target.value)}
      />
      <button
        className="btn btn-default btn-sm"
        onClick={store.onAddItem.bind(store)}
        disabled={store.editorIsEmpty}
      >
        {store.buttonText}
      </button>
    </div>
  );
};

export default {
  component: EditPage
};
