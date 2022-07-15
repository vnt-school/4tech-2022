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
  IconButton,
} from "@chakra-ui/react";
import { api } from "../services/api";
import { IExpenses } from "../models/IExpense";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface Props {
  expenses: IExpenses[];
  onAddExpense: () => void;
  onEditExpense: (expense: IExpenses) => void;
  onRemoveExpense: (expense: IExpenses) => void;
}

const FinancesTable = ({ expenses, onAddExpense, onEditExpense, onRemoveExpense }: Props) => {
  const toBRL = (value: number) =>
    value.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
    });

  // let total = 0;

  // for (let i = 0; i < expenses.length; i++) {
  //   total += expenses[i].value;
  // }

  const total = expenses.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  return (
    <>
      <Box
        flexDirection="row"
        display="flex"
        w="80vw"
        justifyContent="space-between"
      >
        <Heading size="lg">
          Total: {toBRL(total)}
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
                <Th>AÇÕES</Th>
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
                  <Td>
                    <IconButton
                      aria-label="Editar"
                      icon={<EditIcon />}
                      color="yellow.500"
                      variant="ghost"
                      onClick={() => {
                        onEditExpense(expense);
                      }}
                    />
                    <IconButton
                      aria-label="Remover"
                      icon={<DeleteIcon />}
                      color="red.600"
                      variant="ghost"
                      onClick={() => onRemoveExpense(expense)}
                    />
                  </Td>
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
