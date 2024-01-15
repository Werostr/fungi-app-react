import React, { useEffect, useState } from "react";
import test from "../services/test";

export default function Test() {
  const [data, setData] = useState("");

  useEffect(() => {
    test
      .getTest()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Błąd pobierania danych:", error);
      });
  }, []);
  return <div> It works! {data} </div>;
}
