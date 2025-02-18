const API_KEYS = [
  process.env.REACT_APP_API_KEY0,
  process.env.REACT_APP_API_KEY1,
  process.env.REACT_APP_API_KEY2,
  process.env.REACT_APP_API_KEY3,
  process.env.REACT_APP_API_KEY4,
  process.env.REACT_APP_API_KEY5,
  process.env.REACT_APP_API_KEY6,
  process.env.REACT_APP_API_KEY7,
  process.env.REACT_APP_API_KEY8,
  process.env.REACT_APP_API_KEY9,
  process.env.REACT_APP_API_KEY10,
  process.env.REACT_APP_API_KEY11,
  process.env.REACT_APP_API_KEY12,
  process.env.REACT_APP_API_KEY13,
  process.env.REACT_APP_API_KEY14,
  process.env.REACT_APP_API_KEY15,
].filter(Boolean);

if (API_KEYS.length === 0) {
  throw new Error(
    "No API keys available. Please provide at least one API key."
  );
} else {
  console.log("API_KEYS: ", API_KEYS.length);
}

const STORAGE_KEY = "current_api_key_index";

export const getNextApiKey = () => {
  if (API_KEYS.length === 1) {
    return API_KEYS[0];
  }

  const currentIndex = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
  const nextIndex = (currentIndex + 1) % API_KEYS.length;
  localStorage.setItem(STORAGE_KEY, nextIndex.toString());
  return API_KEYS[nextIndex];
};

export const getCurrentApiKey = () => {
  if (API_KEYS.length === 1) {
    return API_KEYS[0];
  }

  const currentIndex = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
  return API_KEYS[currentIndex];
};
