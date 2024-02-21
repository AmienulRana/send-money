import { SendMoneyContextType } from "@/context/SendMoneyContext";
import { currencyFormatIDR } from "@/utils/helper";
import { Flex, Text } from "@mantine/core";

export default function TotalAllCost({ formValues }: SendMoneyContextType) {
  return (
    <>
      <Flex
        justify={"space-between"}
        align={"center"}
        my={14}
        c={formValues?.discount ? "green" : ""}
      >
        <Text>Voucher</Text>
        <Text>Rp{currencyFormatIDR(formValues?.discount)}</Text>
      </Flex>
      <Flex justify={"space-between"} align={"center"} mb={14}>
        <Text>Biaya Admin</Text>
        <Text>
          Rp
          {currencyFormatIDR(formValues?.calculator?.mode === "instant" ? 5000 : 0).toLocaleString()}
        </Text>
      </Flex>
      <Flex justify={"space-between"} align={"center"} my={14}>
        <Text>Total Transfer</Text>
        <Flex gap={5} align={"center"}>
          {formValues?.discount !== 0 && (
            <Text size="xs" td={"line-through"} c={"gray.5"}>
              Rp{currencyFormatIDR(formValues?.totalTransfer)}
            </Text>
          )}
          <Text>
            Rp
            {currencyFormatIDR(
              formValues?.totalTransfer - formValues?.discount
            )}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
