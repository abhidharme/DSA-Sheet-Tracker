import { useEffect } from "react";

const useFetch = (action, deps = []) => {
  useEffect(() => {
    action();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useFetch;
