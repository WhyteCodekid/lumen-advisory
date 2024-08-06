import axios from "axios";
import { toast } from "sonner";

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.data.status === "error") {
      toast.error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch categories");
  }
};
