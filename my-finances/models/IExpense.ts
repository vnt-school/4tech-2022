export interface IExpenses {
    id: number;
    date: number;
    description: string;
    category: string;
    value: number;
}

export interface SaveExpenseDto extends Omit<IExpenses, 'id'> {
    
}
