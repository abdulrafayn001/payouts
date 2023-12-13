import axios from "axios";
import { FetchDataResult } from "../types/apiCalls.type";
import { Payout } from "../types";

const fetchPayoutData = async (
  searchTerm: string,
  currentPage: number
): Promise<FetchDataResult<Payout>> => {
  try {
    const itemsPerPage = import.meta.env.VITE_ITEMS_PER_PAGE;
    const offset = currentPage * itemsPerPage;
    const baseURL: string = import.meta.env.VITE_BASE_URL || "";
    let endpoint: string = `${baseURL}/payouts`; // Default endpoint for fetching data

    if (searchTerm) {
      endpoint = `${baseURL}/search?query=${searchTerm}`; // Endpoint for searching
    }

    const response = await axios.get(endpoint, {
      params: {
        limit: itemsPerPage,
        offset: offset,
      },
    });
    const data: Payout[] =
      (searchTerm ? response.data : response.data.data) || [];
    const totalCount: number =
      response.data?.metadata?.totalCount || data.length;
    const totalPages: number = Math.ceil(totalCount / itemsPerPage);

    return { data, totalPages };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data", data: [], totalPages: 0 };
  }
};

export default fetchPayoutData;
