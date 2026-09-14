import { useState } from "react";

function readFromStorage(key, fallbackValue) {
  const saved = sessionStorage.getItem(key);
  if (!saved) return fallbackValue;
  try {
    return JSON.parse(saved);
  } catch {
    return fallbackValue;
  }
}

// Like useState, but the value is remembered in sessionStorage under `key`.
export default function usePersistentState(key, fallbackValue) {
  const [value, setValue] = useState(() => readFromStorage(key, fallbackValue));

  const save = (nextValue) => {
    setValue(nextValue);
    sessionStorage.setItem(key, JSON.stringify(nextValue));
  };

  return [value, save];
}
