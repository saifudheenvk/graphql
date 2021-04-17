import axios from "./index";
import { baseUrl } from "../constants";

export default function ApiFunction(requestObject) {
  return axios({
    url: `${baseUrl}/api`,
    method: "POST",
    data: JSON.stringify(requestObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
