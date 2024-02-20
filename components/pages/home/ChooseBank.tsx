import { dataBank } from "@/data/banks";
import useStepStore from "@/hooks/useStepStore";
import useTransaction from "@/hooks/useTransaction";
import { Box, Button, Flex, Radio, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const OptionBank = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1px solid",
  borderColor: '#e4e4e4',
  paddingRight: 10,
  paddingLeft: 10,
  width: "100%",
});


export default function ChooseBank() {
  const [bankSelected, setBankSelected] = useState("");

  const {submitTransaction} = useTransaction();
  const {nextStep} = useStepStore();

  const handleChooseBank = () => {
    submitTransaction();
    nextStep();
  }
  return (
    <>
      <Text size="md" mt={25} mb={5} fw={"bold"}>
        Pilih Bank Pembayaran
      </Text>
      <Text size="sm" c={"gray.5"} mb={20}>
        Pilih salah satu opsi bank di bawah ini dan kami akan mengirimkan Anda
        nomor virtual account
      </Text>
      {dataBank.map((bank) => (
        <OptionBank key={bank.name} onClick={() => setBankSelected(bank.name)}>
          <Flex align={"center"} gap={10}>
            <Image src={bank?.icon} width={50} height={50} alt="bank mandiri" />
            <Text size="sm">{bank?.name}</Text>
          </Flex>
          <Radio checked opacity={bank?.name === bankSelected ? 1 : 0} />
        </OptionBank>
      ))}

      <Button fw={"normal"} fullWidth mt={20} onClick={handleChooseBank}>
        Bayar Sekarang
      </Button>
    </>
  );
}
