import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function TodoItem({ todo, update }) {
  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  function changeTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let pos = todo.id;
    let body = {
      data: {
        item,
      },
    };

    fetch(`${process.env.REACT_APP_BACKEND}api/todos/${pos}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      setEdit(false);
      update();
    });
  }

  function deleteTodo(e) {
    e.preventDefault();
    let pos = todo.id;

    fetch(`${process.env.REACT_APP_BACKEND}api/todos/${pos}`, {
      method: "DELETE",
    }).then(() => {
      update();
    });
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!edit ? (
        <div>{todo.attributes.item}</div>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          component="form"
          onSubmit={changeTodo}
        >
          <TextField
            sx={{
              height: "100%",
              "& label.Mui-focused": {
                color: "#00ADEF",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00ADEF",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF", // update background color
                "& fieldset": {
                  borderColor: "#00ADEF",
                },
                "&:hover fieldset": {
                  borderColor: "#0077B6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00ADEF",
                },
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
              marginTop: "20px",
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
            Change todo
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "auto",
        }}
      >
        <Box>
          <Button
            className="delete-btn"
            variant="contained"
            color="error"
            onClick={deleteTodo}
            sx={{
              borderRadius: "20px",
              boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#ff4d6a",
                boxShadow: "0 5px 10px rgba(0,0,0,0.5)",
              },
            }}
          >
            Delete
          </Button>
        </Box>
        <Box>
          <Button
            className="edit-btn"
            variant="contained"
            color="primary"
            onClick={() => {
              setEdit(!edit);
              setNewTodo(todo.attributes.item);
            }}
            sx={{
              borderRadius: "20px",
              boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#999",
                boxShadow: "0 5px 10px rgba(0,0,0,0.5)",
              },
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TodoItem;
