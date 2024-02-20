import { useSendMoney } from "@/context/SendMoneyContext";
import { Button, Flex, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";
import styled from "styled-components";

import CodeVoucher from "./confirmationTransaction/CodeVoucher";
import SenderDetail from "./confirmationTransaction/SenderDetail";
import ReceiveDetail from "./confirmationTransaction/ReceiveDetail";
import TotalAllCost from "./confirmationTransaction/TotalAllCost";
import ModalConfirm from "./confirmationTransaction/ModalConfirm";
import useStepStore from "@/hooks/useStepStore";

const Wrapper = styled.section({});

export const WrapperConfirm = styled.section({
  border: "2px solid",
  padding: 10,
  borderColor: "blue",
  borderRadius: "10px",
});

export default function ConfirmationTransaction() {
  const { formValues, setFormValues } = useSendMoney();
  const { prevStep } = useStepStore();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Wrapper>
      <Title ta={"center"} mt={20} mb={15} order={3} mx={"auto"}>
        Konfirmasi Detail Transaksi
      </Title>
      <SenderDetail formValues={formValues} setFormValues={setFormValues} />

      <Text mt={25} mb={15}>
        Penerima:
      </Text>
      <ReceiveDetail formValues={formValues} setFormValues={setFormValues} />

      <CodeVoucher formValues={formValues} setFormValues={setFormValues} />
      <TotalAllCost formValues={formValues} setFormValues={setFormValues} />

      <ModalConfirm opened={opened} close={close} />
      <Flex gap={10} mt={25}>
        <Button
          onClick={prevStep}
          fullWidth
          variant="light"
          type="submit"
          fw={"normal"}
        >
          Kembali
        </Button>
        <Button
          fw={"normal"}
          fullWidth
          onClick={open}
          rightSection={<IconArrowRight size={14} />}
        >
          Pilih Pembayaran
        </Button>
      </Flex>
    </Wrapper>
  );
}
