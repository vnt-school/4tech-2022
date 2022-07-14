import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import FinancesTable from "../components/FinancesTable";
import { Heading, useDisclosure } from "@chakra-ui/react";
import NewExpenseModal from "../components/NewExpenseModal";
import { useState } from "react";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          onAddExpense={() => onOpen()}
        />
        <NewExpenseModal
          isOpen={isOpen}
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
