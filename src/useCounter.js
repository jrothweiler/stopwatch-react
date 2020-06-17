import { useState, useEffect, useReducer } from "react";

const initialState = {
  diffStartTime: 0,
  lastTick: 0,
};

function stopWatchReducer(state, { type, payload }) {
  switch (type) {
    case "toggle": {
      return {
        lastTick: payload,
        diffStartTime:
          state.diffStartTime <= 0
            ? state.diffStartTime + payload
            : state.diffStartTime - payload,
      };
    }
    case "tick": {
      return { ...state, lastTick: payload };
    }
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const useStopWatch = () => {
  const [{ diffStartTime, lastTick }, internalDispatch] = useReducer(
    stopWatchReducer,
    initialState
  );

  const isCounting = diffStartTime > 0;
  const ellapsedTime =
    diffStartTime < 0 ? -diffStartTime : lastTick - diffStartTime;
  const dispatch = (type) => {
    if (type === "tick") {
      return;
    }
    internalDispatch({ type, payload: Date.now() });
  };

  useEffect(() => {
    if (!isCounting) return;

    const token = setInterval(() => {
      internalDispatch({ type: "tick", payload: Date.now() });
    }, 10);

    return () => {
      clearInterval(token);
    };
  }, [isCounting]);

  return [{ isCounting, ellapsedTime }, dispatch];
};

export default () => {
  const [{ ellapsedTime, isCounting }, internalDispatch] = useStopWatch();
  const [lapTimes, setLapTimes] = useState([]);

  const dispatch = (event) => {
    if (event !== "lap") {
      internalDispatch(event);
      if (event === "reset") {
        setLapTimes([]);
      }
      return;
    }
    setLapTimes((prev) => {
      const totalTime = prev.reduce((a, b) => a + b, 0);
      return [ellapsedTime - totalTime, ...prev];
    });
  };

  return [{ ellapsedTime, isCounting, lapTimes }, dispatch];
};

