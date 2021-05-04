import { useState, useEffect, useRef } from "react";
import { IFetchData } from "../types";
const useForm = (initailValues: any) => {
  const [values, setValues] = useState(initailValues);

  return [
    values,
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
  ];
};

 

const useFetch = (url:string) => {
  const [state, setState] = useState<IFetchData>({ data: null, loading: false });
  const isCurrent = useRef(true);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));
    fetch(url)
      .then((x) => x.text())
      .then((y) => {
        setTimeout(() => {
          if (isCurrent.current) {
            setState({ data: y, loading: false });
          }
        }, 200);
      });
  }, [url, setState]);

  return state;
};

const useCountRenders = () => {
  const renders = useRef(0);
  console.log(renders.current++);
};

export { useForm, useFetch, useCountRenders };
