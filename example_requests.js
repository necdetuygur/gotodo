// SET TOKEN
fetch("http://localhost:3200/auth/login", {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify({
    username: "admin",
    password: "password",
  }),
})
  .then((r) => r.json())
  .then((r) => {
    localStorage.setItem("token", r.token);
  });

// ADD TODO
fetch("http://localhost:3200/todos", {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify({
    Detail: "TEST1",
    Completed: false,
  }),
})
  .then((r) => r.json())
  .then(console.log);

// GET TODOS
fetch("http://localhost:3200/todos", {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
})
  .then((r) => r.json())
  .then(console.log);
