import { IInfoBox } from "@/interfaces";
import { Flex, Text, Title } from "@mantine/core";
import { memo } from "react";

const InfoBox = ({ title, value }: IInfoBox) => {
  return (
    <Flex my="xl" justify={"space-between"} align={"center"}>
      <Text>{title}</Text>
      <Text size="xl">{value}</Text>
    </Flex>
  );
}

export default memo(InfoBox);
