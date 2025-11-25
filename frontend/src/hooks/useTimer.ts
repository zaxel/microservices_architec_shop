import { TimerType } from "@/types";
import { useRef } from "react";

const useTimer = (): TimerType => {
const startTime = useRef<null | number>(null);

  function startTimer() {
    startTime.current = Date.now();
  }
  function getDuration() {
    if (!startTime.current) 
        return 0;
    const duration = (Date.now() - startTime.current) / 1000;
    return duration;
  }
  function resetStartTimer() {
    startTime.current = Date.now();
  }
  return { startTimer, resetStartTimer, startTime, getDuration };
};
export default useTimer;
