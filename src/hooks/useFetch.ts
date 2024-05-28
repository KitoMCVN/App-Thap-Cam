import { useState, useEffect } from "react";
import axios, { AxiosHeaders } from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useFetch = <H extends AxiosHeaders, B>(url: string, method: Method, headers?: H, body?: B) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    switch (method) {
      case "GET":
        axios
          .get(url, {
            cancelToken: source.token,
            headers: headers,
          })
          .then((res) => {
            setLoading(false);
            res.data && setData(res.data);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
        break;
      case "POST":
        axios
          .post(url, {
            cancelToken: source.token,
            headers: headers,
            data: body,
          })
          .then((res) => {
            setLoading(false);
            res.data && setData(res.data);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
        break;
      case "PUT":
        axios
          .put(url, {
            cancelToken: source.token,
            headers: headers,
            data: body,
          })
          .then((res) => {
            setLoading(false);
            res.data && setData(res.data);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
        break;
      case "DELETE":
        axios
          .delete(url, {
            cancelToken: source.token,
            headers: headers,
            data: body,
          })
          .then((res) => {
            setLoading(false);
            res.data && setData(res.data);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
        break;
      default:
        setError("Invalid Method?");
        break;
    }

    return () => {
      source.cancel();
    };
  }, [body, headers, method, url]);

  return { data, loading, error };
};

export default useFetch;
