import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import FinancesTable from "../components/FinancesTable";
import { Heading, useDisclosure } from "@chakra-ui/react";
import NewExpenseModal from "../components/NewExpenseModal";
import { useEffect, useState } from "react";
import { IExpenses } from "../models/IExpense";
import { api, getExpenses } from "../services/api";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [expenses, setExpenses] = useState<IExpenses[]>([]);

  const fetchExpenses = () =>
    getExpenses().then(expenseList => setExpenses(expenseList));

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>My finances</title>
        <meta name="description" content="Vnt 4tech 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h2" mb="100px">
          My Finances
        </Heading>
        <FinancesTable
          expenses={expenses}
          onAddExpense={() => onOpen()}
        />
        <NewExpenseModal
          isOpen={isOpen}
          onSave={() => {
            fetchExpenses();
            onClose();
          }}
          onClose={onClose}
        />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.venturus.org.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Venturus
        </a>
      </footer>
    </div>
  );
};

export default Home;
