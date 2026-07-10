import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import type { ContentType } from "../components/CreateContentModal";

export const useContent = () => {
  const [contents, setContents] = useState<Array<{ _id: string; title: string; link: string; type: ContentType }>>([]);

  // function refresh() {
  //   axios.get(`${BACKEND_URL}/api/v1/content`, {
  //     headers: {
  //       // "Content-Type": "application/json",
  //       Authorization: localStorage.getItem("token") || "",
  //     }
  //   }).then((response) => {
  //     setContents(response.data.content)
  //   })
  //   .catch(AxiosError) {
  //     console.log(AxiosError)
  //   }
  // }

  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch ((err) => console.log(err))
  }

  useEffect(() => {
    refresh();
    let interval = setInterval(() => {
      refresh();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, setContents, refresh };
};
