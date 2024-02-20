"use client";
import { SendMoneyProvider } from "@/context/SendMoneyContext";
import useStepStore from "@/hooks/useStepStore";
import { Button, Container, Group, Stepper } from "@mantine/core";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import dynamic from 'next/dynamic'
 
const Navbar = dynamic(() => import('../components/elements/navbar/Navbar'));
const Calculator = dynamic(() => import('../components/pages/home/Calculator'));
const BankForm = dynamic(() => import('../components/pages/home/BankForm'));
const ChooseBank = dynamic(() => import('../components/pages/home/ChooseBank'));
const ConfirmationTransaction = dynamic(() => import('../components/pages/home/ConfirmationTransaction'));
const TransactionSuccess = dynamic(() => import('../components/pages/home/TransactionSuccess'));

export default function Home() {
  const queryClient = new QueryClient();

  const {activeStep, nextStep, prevStep } = useStepStore();

  return (
    <QueryClientProvider client={queryClient}>
      <SendMoneyProvider>
        <Container size="xs" py={20}>
          <Navbar />
          <Stepper
            mt={20}
            iconSize={20}
            size="xs"
            active={activeStep}
            color="#30A6FF"
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="Calculator">
              <Calculator />
            </Stepper.Step>
            <Stepper.Step label="Received Bank">
              <BankForm />
            </Stepper.Step>
            <Stepper.Step label="Confirm">
              <ConfirmationTransaction />
            </Stepper.Step>
            <Stepper.Step label="Payment">
              <ChooseBank />
            </Stepper.Step>
            <Stepper.Completed>
              <TransactionSuccess />
            </Stepper.Completed>
          </Stepper>
        </Container>
      </SendMoneyProvider>
    </QueryClientProvider>
  );
}
