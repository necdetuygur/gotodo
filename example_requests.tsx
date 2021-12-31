import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const App = () => {
  const [kullaniciAdi, setKullaniciAdi] = useState("admin");
  const [parola, setParola] = useState("password");
  const [todos, setTodos] = useState([]);
  const [detail, setDetail] = useState("");

  const GirisYap = () => {
    axios
      .post("http://localhost:3200/auth/login", {
        username: kullaniciAdi,
        password: parola,
      })
      .then((r) => {
        localStorage.setItem("token", r.data.token);
      });
  };

  const AddTodo = () => {
    axios
      .post(
        "http://localhost:3200/todos",
        {
          detail: detail,
          compoleted: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((r) => {
        console.log(r);
      });
  };

  const GetTodos = () => {
    axios
      .get("http://localhost:3200/todos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((r) => {
        setTodos(r.data);
      });
  };

  return (
    <div
      className="container-fluid bg-white text-black mt-3"
      style={{ height: "500px", padding: "10px" }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Kullanıcı Adı"
          variant="outlined"
          defaultValue={kullaniciAdi}
          onChange={(e) => setKullaniciAdi(e.target.value)}
        />
        <TextField
          label="Parola"
          variant="outlined"
          defaultValue={parola}
          onChange={(e) => setParola(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            GirisYap();
            GetTodos();
          }}
        >
          Giriş Yap
        </Button>
        <br />
        <TextField
          label="Todo Detail"
          variant="outlined"
          defaultValue={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            AddTodo();
            setDetail("");
            GetTodos();
          }}
        >
          Add Todo
        </Button>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            GetTodos();
          }}
        >
          Get Todos
        </Button>
        <br />
        {todos.map((todo: any) => (
          <div key={todo.Id}>{todo.Detail}</div>
        ))}
      </Box>
    </div>
  );
};

export default App;
