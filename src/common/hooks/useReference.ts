import { useEffect,useRef } from "react";

const useReference = <T>(data: T) => {
  const container = useRef(data);
  useEffect(() => {
    container.current = data;
  }, [data]);
  return container;
};

export default useReference;
