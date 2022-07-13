export interface IExpenses {
  id: number;
  date: number;
  description: string;
  category: string;
  value: number;
}

export interface ICategories {
  id: number;
  name: string;
}
