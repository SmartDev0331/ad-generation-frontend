
import axios, { AxiosResponse } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function removeBackground(url: string) {
  try {
    const response: AxiosResponse = await axios.post(`${apiUrl}/more/removeBackground/`, {
      remove_bg_url: url
    });

    return response.data;
  }
  catch (err) {

  }

  // return response;
}
