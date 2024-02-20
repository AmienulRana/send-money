"use client";

import { Navbar } from "@/components/elements/navbar";
import { ListTransaction } from "@/components/pages/history";
import { SendMoneyProvider } from "@/context/SendMoneyContext";
import useTransaction from "@/hooks/useTransaction";
import { Container, Text } from "@mantine/core";

export default function History() {
  return (
    <SendMoneyProvider>
      <Container size={"xs"} py={20}>
        <Navbar />
       <ListTransaction />
      </Container>
    </SendMoneyProvider>
  );
}
