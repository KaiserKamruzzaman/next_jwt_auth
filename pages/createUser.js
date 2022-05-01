import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submitFormHandler = (e) => {
    e.preventDefault();
    axios.post("/api/createUser", { formData }).then((response) => {
      console.log(response);
      //router.push("/dashboard");
    });
  };
  return (
    <>
      <div>Welcome to dashboard</div>
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
    </>
  );
}
