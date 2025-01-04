import api from "../Config/index";

// export const getSingleCourtsApi = async (id: number, userId: number) => {
//   try {
//     const userCourt = `/get-specific-court/${id}/?user_id=${userId}&filter=512`;
//     const guestCourt = `/get-specific-court/${id}/?filter=512`;
//     const response = api.get(userId ? userCourt : guestCourt);
//     return (await response).data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getNewsAPI = async (payload: any) => {
  try {
    const { search, sort, location, page, sport } = payload;
    const url = `/courts/?search=${search}&sort=${
      sort || ""
    }?sports=17&page=${page}&filter=512`;

    const sportURL = url;
    const response = api.get(sportURL);
    return (await response).data;
  } catch (error) {
    throw error;
  }
};
