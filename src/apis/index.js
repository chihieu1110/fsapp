import axios from "axios";
import { API_ROOT } from "~/utils/constants";

//boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return response.data;
};
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  );
  return response.data;
};

export const relocateCardToColumnAPI = async (updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/assists/card_in_motion`,
    updateData
  );
  return response.data;
};
//columns
export const newCreatedColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return response.data;
};
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  );
  return response.data;
};
//cards
export const newCreatedCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return response.data;
};

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(
    `${API_ROOT}/v1/columns/${columnId}`,
    columnId
  );
  return response.data;
};