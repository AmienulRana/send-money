import { ICardOptionProps } from "@/interfaces";
import { Box, Flex, Radio, Text } from "@mantine/core";
import { memo } from "react";
import styled from "styled-components";



const Wrapper = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid",
    borderColor: "#e4e4e4",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    cursor: 'pointer',
    transition: '300ms',
    ":hover": {
        opacity: 0.8
    }
  });
  
  const WrapperIcons = styled.div({
    height: 40,
    width: 40,
    color: "white",
    fontSize: 20,
    background: "#30A6FF",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

const CardOption = ({
  icon,
  title,
  description,
  onClick,
  checked,
}: ICardOptionProps) => {
  return (
    <Wrapper onClick={onClick}>
      <Flex align={"center"} gap={15}>
        <WrapperIcons>{icon}</WrapperIcons>
        <Box>
          <Text size="sm">{title}</Text>
          <Text size="xs" c={"gray.5"}>
            {description}
          </Text>
        </Box>
      </Flex>
      {checked && <Radio checked readOnly />}
    </Wrapper>
  );
};

export default memo(CardOption);
