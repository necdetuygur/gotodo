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
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
