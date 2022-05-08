import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
export default function Dashboard() {
  const router = useRouter();

  const testCookie = () => {
    axios
      .get("/api/getUsers", {
        headers: {
          Authorization: "helo from header",
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const logoutHandler = () => {
    axios
      .get("/api/logout")
      .then((response) => {
        if (response.status === 200) {
          router.push("/login");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("unauthorize user...");
        }
      });
  };
  return (
    <>
      <div>Welcome to dashboard</div>
      <button onClick={testCookie}>Test</button> |||||
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}
