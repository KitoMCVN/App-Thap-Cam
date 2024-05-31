import { useState, useEffect, useCallback, useMemo } from "react";
import axios, { AxiosHeaders } from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useFetch = (
  url: string,
  method: Method,
  headers?: AxiosHeaders | Map<string, unknown> | any,
  body?: any
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>({});
  // Memoize dependencies to prevent unnecessary re-renders
  const memoizedUrl = useMemo(() => url, [url]);
  const memoizedMethod = useMemo(() => method, [method]);
  const memoizedHeaders = useMemo(() => headers, [headers]);
  const memoizedBody = useMemo(() => body, [body]);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios(url, {
        method,
        headers,
        data: body,
      });
      setLoading(false);
      setData(res.data);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [memoizedUrl, memoizedBody, memoizedHeaders, memoizedMethod]);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 2 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetch;
