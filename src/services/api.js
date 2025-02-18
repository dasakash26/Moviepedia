import axios from "axios";
import { getCurrentApiKey, getNextApiKey } from "../utils/apiKeyManager";

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchFromOMDB = async (searchParams) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${searchParams}&apikey=${getCurrentApiKey()}`
    );
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 429 || error.response?.status === 401)
    ) {
      const nextKeyResponse = await axios.get(
        `${BASE_URL}${searchParams}&apikey=${getNextApiKey()}`
      );
      return nextKeyResponse.data;
    }
    console.error("API request failed:", error);
    throw error;
  }
};
