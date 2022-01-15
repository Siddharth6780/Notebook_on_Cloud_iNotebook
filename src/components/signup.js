import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    epassword: "",
  });
  let history = useHistory();
  const handleSummit = async (e) => {
    e.preventDefault();
    const { name, email, password, epassword } = credentials;
    const response = await fetch("https://inotebook-backend-nodejs.herokuapp.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (password === epassword && json.success === true) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      // alert("dcd");
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <div className="heading_container d-flex justify-content-around">
        <h2>Signup to use iNotebook</h2>
      </div>
      <form onSubmit={handleSummit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            required
            name="name"
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            name="email"
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div class="valid-feedback">Good! Your email address looks valid.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            minLength={5}
            required
            name="password"
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            onpaste="return false;"
            ondrop="return false;"
            autocomplete="off"
            minLength={5}
            required
            name="epassword"
            onChange={onChange}
            type="password"
            className="form-control"
            id="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
