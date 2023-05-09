import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "@fontsource/roboto/300.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    update();
  }, []);

  function update() {
    fetch(`${process.env.REACT_APP_BACKEND}api/todos`)
      .then((res) => res.json())
      .then((todo) => {
        setTodos(todo.data);
      });
  }

  // http://localhost:1337/api/todos    // this is the url we are sending the request to
  function addTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let body = {
      data: {
        item,
      },
    };

    fetch(`${process.env.REACT_APP_BACKEND}api/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      setNewTodo("");
      update();
    });
  }

  return (
    <div className="app">
      <Box sx={{ marginTop: "50px" }}>
        <Typography variant="h2">TODO LIST</Typography>
        <main>
          <form
            sx={{
              marginTop: "20px",
            }}
            onSubmit={addTodo}
          >
           <TextField
  sx={{
    marginTop: "20px",
    width: "500px",
    height: "100%",
    backgroundColor: "#FFFFFF",
    color: "#333333",
    "&:hover": {
      backgroundColor: "#F0F0F0",
    },
  }}
  type="text"
  placeholder="Enter new todo"
  value={newTodo}
  onChange={(e) => setNewTodo(e.currentTarget.value)}
/>


            <Button
              sx={{
                justifyContent: "center",
                marginTop: "40px",
                marginLeft: "20px",
                backgroundColor: "#00ADEF",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0077B6",
                },
              }}
              variant="contained"
              type="submit"
            >
              Add todo
            </Button>
          </form>

          <div>
            {todos.map((todo, i) => {
              return (
                <Box
                  sx={{
                    marginTop: "20px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{
                      width: "100%",
                      fontFamily: "Roboto",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <TodoItem todo={todo} key={i} update={update} />
                    </Box>
                  </Typography>
                </Box>
              );
            })}
          </div>
        </main>
      </Box>
    </div>
  );
}
export default App;
