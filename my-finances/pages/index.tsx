import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import FinancesTable from "../components/FinancesTable";
import { Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
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
        <FinancesTable />
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
