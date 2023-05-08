import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // update update the list of todos
    // when the component is rendered for the first time
    update();
  }, []);

  // This function updates the component with the
  // current todo data stored in the server
  function update() {
    fetch(`${process.env.REACT_APP_BACKEND}api/todos`)
      .then(res => res.json())
      .then(todo => {
        setTodos(todo.data);
      })
  }

  // This function sends a new todo to the server
  // and then call the update method to update the
  // component
  function addTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let body = {
      data: {
        item
      }
    };
 
    fetch(`${process.env.REACT_APP_BACKEND}api/todos`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        setNewTodo("");
        update();
      })
  }

  return (
    <div className="app">
      <main>
        {/* we centered the "main" tag in our style sheet*/}

        {/* This form collects the item we want to add to our todo, and sends it to the server */}
        <form className="form" onSubmit={addTodo}>
          <input type="text" className="todo_input" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value) }/>
          <button type="submit" className="todo_button">Add todo</button>
        </form>

        {/* This is a list view of all the todos in the "todo" state variable */}
        <div>
          {
            todos.map((todo, i) => {
              return <TodoItem todo={todo} key={i} update={update} />
            })
          }
        </div>

      </main>
    </div>
  )
}
export default App;