import axios from "axios";
import ICategory from "../models/ICategory";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getCategories = async () => {
  const response = await api.get<ICategory[]>("/categories");

  return response.data;
};