import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './Components/Todos/todos';
import Header from './Components/Layout/header';
import About from './Components/pages/about'
import AddTodo from './Components/Todos/addTodo';
import uuid from 'uuid'

class App extends React.Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Buy Groceries',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Pick up Sis',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Study React',
        completed: false
      }
    ]
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    }) })
  }
  
  delTodo = (id) => {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) })
  }

  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                        delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path='/about' component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
