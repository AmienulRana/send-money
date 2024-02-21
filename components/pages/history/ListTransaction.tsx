import useTransaction from "@/hooks/useTransaction";
import { currencyFormatIDR } from "@/utils/helper";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconSwitchHorizontal } from "@tabler/icons-react";
import styled from "styled-components";

const WrapperList = styled.div({
  padding: 10,
  border: "1px solid",
  borderColor: "gray",
  borderRadius: 10,
  marginBottom: 20
});

const WrapperIcon = styled.div({
    height: 30,
    width:30,
    borderRadius: '50%',
    color: 'white',
    background: '#30A6FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

export default function ListTransaction() {
  const { transactionHistory } = useTransaction();
  return (
    <>
    <Title order={4} mt={20} mb={10}>List Transaksi</Title>
      {transactionHistory?.map((transaction) => (
        <WrapperList key={transaction?.receivedBank?.noRekening}>
            <Flex justify={'space-between'} align={'center'}>
                <Box style={{flex: 1}}>
                    <Text size="xs" c={'gray.6'}>You send</Text>
                    <Text>Rp{currencyFormatIDR(transaction?.calculator?.senderAmount)}</Text>
                </Box>
                <Flex direction={'column'} align={'center'} style={{flex: 1}}>
                    <Text size="xs" c={'gray.6'} mb={2}>to {transaction?.countryName}</Text>
                    <Box component={WrapperIcon}>
                        <IconSwitchHorizontal />
                    </Box>
                </Flex>
                <Box ta={'end'} style={{flex: 1}}>
                    <Text size="xs" c={'gray.6'}>Recipent gets</Text>
                    <Text>{transaction?.calculator?.country} {Number(transaction?.calculator?.receiverAmount).toFixed(2)}</Text>
                </Box>
            </Flex>
        </WrapperList>
      ))}
    </>
  );
}
