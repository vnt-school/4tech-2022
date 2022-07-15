import axios from "axios";
import ICategory from "../models/ICategory";
import { IExpenses, SaveExpenseDto } from "../models/IExpense";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getExpenses = async () => {
  const response = await api.get<IExpenses[]>("/expenses");

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get<ICategory[]>("/categories");

  return response.data;
};

export const saveExpense = async (expense: SaveExpenseDto) => {
  const response = await api.post("/expenses", expense);

  return response.data;
};

