import axios from "axios";
import { ICategories, IExpenses } from "../models/finances";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getCategories = async (): Promise<ICategories[]> => {
  const response = await api.get("/categories");
  return response.data;
};

export const getExpenses = async (): Promise<IExpenses[]> => {
  const response = await api.get("/expenses");
  return response.data;
};
