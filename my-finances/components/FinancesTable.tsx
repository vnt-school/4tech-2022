import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";
import { api } from "../services/api";

export interface IExpenses {
  id: number;
  date: number;
  description: string;
  category: string;
  value: number;
}

interface Props {
  onAddExpense: () => void;
}

const FinancesTable = ({ onAddExpense }: Props) => {
  const [expenses, setExpenses] = useState<IExpenses[]>([]);

  useEffect(() => {
    api.get("/expenses").then(response => setExpenses(response.data))
  }, []);

  const toBRL = (value: number) =>
    value.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
    });

  return (
    <>
      <Box
        flexDirection="row"
        display="flex"
        w="80vw"
        justifyContent="space-between"
      >
        <Heading size="lg">
          {/* Total: {toBRL(expenses?.reduce((acc, curr) => acc + curr.value, 0))} */}
          Total: R$ 999,99
        </Heading>
        <Button
          bg="green.400"
          color="white"
          _hover={{ bg: "green.300" }}
          _active={{ bg: "green.600" }}
          onClick={() => onAddExpense()}
        >
          Adicionar despesa
        </Button>
      </Box>
      <Box
        mt={5}
        border="1px solid"
        borderColor="gray.100"
        borderWidth={2}
        borderRadius="md"
        w="80vw"
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th isNumeric>ID</Th>
                <Th>DATA</Th>
                <Th>DESCRIÇÃO</Th>
                <Th>CATEGORIA</Th>
                <Th>VALOR</Th>
              </Tr>
            </Thead>
            <Tbody>
              {expenses.map((expense) => (
                <Tr key={expense.id}>
                  <Td isNumeric>{expense.id}</Td>
                  <Td>{new Date(expense.date).toLocaleDateString("pt-BR")}</Td>
                  <Td>{expense.description}</Td>
                  <Td>{expense.category}</Td>
                  <Td>{toBRL(expense.value)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default FinancesTable;
