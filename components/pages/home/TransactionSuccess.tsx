import { Box, Button, Flex, Rating, Text } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import SenderDetail from "./confirmationTransaction/SenderDetail";
import { useSendMoney } from "@/context/SendMoneyContext";
import ReceiveDetail from "./confirmationTransaction/ReceiveDetail";
import { useState } from "react";
import Link from "next/link";
import useStepStore from "@/hooks/useStepStore";

export default function TransactionSuccess() {
    const {formValues, setFormValues, resetFormValues} = useSendMoney();
    const {resetStep} = useStepStore();
    const [value, setValue] = useState(0);

    const handleSendReview = () => {
        resetStep();
        resetFormValues?.();
    }

  return (
    <Flex justify={"center"} direction={"column"} align={"center"}>
      <IconCircleCheckFilled size={60} style={{ color: "green" }} />
      <Text size="xl" fw={"bold"} my={15}>
        Selamat Transaksi Anda Telah Berhasil Di Proses
      </Text>
      <Box w={"100%"} mt={20} >
        <Text mb={20} fw={'bold'}>Detail Transaksi:</Text>
        <Box mb={30}>
            <SenderDetail formValues={formValues} setFormValues={setFormValues} />
        </Box>
        <ReceiveDetail formValues={formValues} setFormValues={setFormValues} />
      </Box>
      <Box w={"100%"} mt={20}>
        <Text mb={5} fw={'bold'}>Beri penilaian yuk!</Text>
        <Text mb={20} c={"gray.6"}>Berapa nilai yang anda berikan untuk aplikasi ini, agar orang lain mau menggunakannya?</Text>
        <Rating value={value} onChange={setValue} size={'xl'} style={{margin: '0 auto'}} />
        <Button fullWidth mt={20} onClick={handleSendReview} component={Link} href={'/history'}>
            Kirim
        </Button>
      </Box>
    </Flex>
  );
}
