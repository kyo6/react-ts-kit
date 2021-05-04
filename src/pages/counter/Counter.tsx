import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/reducers";
import { addCounter, incrementCounter } from "../../stores/actions";

function Counter() {
  const count = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  console.log(count);
  return (
    <div className="jumbotron text-center">
      <h3>{count}</h3>
      <button
        className="btn btn-light"
        onClick={() => {
          dispatch(incrementCounter());
        }}
      >
        increment
      </button>
      <button
        className="btn btn-light"
        onClick={() => {
          dispatch(addCounter(3));
        }}
      >
        add
      </button>
    </div>
  );
}

export default Counter;
