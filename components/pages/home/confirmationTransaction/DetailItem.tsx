import { IDetailItem } from "@/interfaces";
import { Flex, Text } from "@mantine/core";



export default function DetailItem({ label, value }: IDetailItem) {
    return (
      <Flex justify="space-between" align="center" mb={14}>
        <Text w={'50%'}>{label}</Text>
        <Text w={'50%'} ta='end' truncate>{value}</Text>
      </Flex>
    );
  };