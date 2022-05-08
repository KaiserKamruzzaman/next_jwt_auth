import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
export default function Dashboard() {
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
  return (
    <>
      <div>Welcome to dashboard</div>
      <button onClick={testCookie}>Test</button>
    </>
  );
}
