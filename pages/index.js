import { useEffect, useState } from "react";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(formData);
  const submitFormHandler = (e) => {
    e.preventDefault();
    axios.post("/api/auth", { formData }).then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <h1>Hello Nahid..</h1>
      <form onSubmit={submitFormHandler}>
        name{" "}
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />{" "}
        <br /> <br />
        E-mail{" "}
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />{" "}
        <br /> <br />
        password{" "}
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
