import { Avatar, Box, Flex, Text, Title } from "@mantine/core";
import { IconHistory } from "@tabler/icons-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Flex gap="md" justify="space-between" align="flex-start" direction="row">
      <Box>
        <Title order={1} size={"h3"}>
          Hi, Martines
        </Title>
        <Text size="xs" c={"gray"} mt={4}>
          Welcome Back
        </Text>
      </Box>
      <Flex gap={20} align={"center"}>
        <Link href={"/history"}>
          <IconHistory color="gray" />
        </Link>
        <Link href={"/"}>
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-qhn6EXFBqptExJB5AOIlXNHTEwm-G83Dw&usqp=CAU"
            alt="it's me"
          />
        </Link>
      </Flex>
    </Flex>
  );
}
