import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const IDLE_TIMEOUT_MINUTES = import.meta.env.VITE_IDLE_TIMEOUT_MINUTES;
const REPORT_INTERVAL_MINUTES = import.meta.env.VITE_ACTIVE_TIME_REPORT_MINUTES;

const IDLE_TIMEOUT_MS = Number(IDLE_TIMEOUT_MINUTES) * 60 * 1000;
const HEARTBEAT_INTERVAL_MS = Number(REPORT_INTERVAL_MINUTES) * 60 * 1000;
const EVENT_NAME = "app_active_time";

const INTERACTION_EVENTS: Array<keyof WindowEventMap> = [
  "mousemove",
  "keydown",
  "click",
  "scroll",
  "touchstart",
];
const VISIBILITY_CHANGE_EVENT = "visibilitychange";
const BEFORE_UNLOAD_EVENT = "beforeunload";

export const useAppActiveTimeTracker = () => {
  const activeStartRef = useRef<number | null>(null);
  const idleTimeoutRef = useRef<number | null>(null);
  const activeTimeRef = useRef<number | null>(null);
  const totalActiveTimeRef = useRef(0);
  const isVisibleRef = useRef(true);

  const startTimer = () => {
    if (activeStartRef.current === null && isVisibleRef.current) {
      activeStartRef.current = Date.now();
    }
  };

  const stopTimer = () => {
    if (activeStartRef.current !== null) {
      totalActiveTimeRef.current += Date.now() - activeStartRef.current;
      activeStartRef.current = null;
    }
  };

  const resetIdleTimer = () => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    startTimer();
    idleTimeoutRef.current = window.setTimeout(stopTimer, IDLE_TIMEOUT_MS);
  };

  const publishActiveTime = () => {
    stopTimer();
    const seconds = Math.floor(totalActiveTimeRef.current / 1000);

    if (seconds > 0) {
      posthog.capture(EVENT_NAME, { duration_seconds: seconds });
      totalActiveTimeRef.current = 0;
    }
  };

  const attachInteractionListeners = () => {
    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, resetIdleTimer, { passive: true }),
    );
  };

  const detachInteractionListeners = () =>
    INTERACTION_EVENTS.forEach((event) =>
      window.removeEventListener(event, resetIdleTimer),
    );

  const handleVisibilityChange = () => {
    isVisibleRef.current = !document.hidden;

    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  useEffect(() => {
    startTimer();
    resetIdleTimer();

    attachInteractionListeners();
    document.addEventListener(VISIBILITY_CHANGE_EVENT, handleVisibilityChange);

    activeTimeRef.current = window.setInterval(
      publishActiveTime,
      HEARTBEAT_INTERVAL_MS,
    );

    window.addEventListener(BEFORE_UNLOAD_EVENT, publishActiveTime);

    return () => {
      publishActiveTime();

      detachInteractionListeners();
      document.removeEventListener(
        VISIBILITY_CHANGE_EVENT,
        handleVisibilityChange,
      );
      window.removeEventListener(BEFORE_UNLOAD_EVENT, publishActiveTime);

      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (activeTimeRef.current) clearInterval(activeTimeRef.current);
    };
  }, []);
};
