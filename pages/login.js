import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //console.log(formData);
  const submitFormHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth", { formData })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("unauthorize user...");
        }
      });
  };
  return (
    <div>
      <h1>Hello Nahid..</h1>
      <form onSubmit={submitFormHandler}>
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
        <button type="submit">Log In </button>
      </form>
    </div>
  );
}
