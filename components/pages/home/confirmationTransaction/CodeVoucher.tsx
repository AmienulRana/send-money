import { SendMoneyContextType } from "@/context/SendMoneyContext";
import { Input, Text } from "@mantine/core";
import { IconDiscount2 } from "@tabler/icons-react";

export default function CodeVoucher({ formValues, setFormValues }: SendMoneyContextType) {
  const handleChangeDiscount = (value: string) => {
    if (value === "LIMARIBU" && formValues?.totalTransfer > (5000 * 2)) {
      return setFormValues({
        ...formValues,
        discount: 5000,
      });
    } else if (value === "SEPULUHRIBU" && formValues?.totalTransfer > (10000 * 2)) {
      return setFormValues({
        ...formValues,
        discount: 10000,
      });
    }

    setFormValues({
      ...formValues,
      discount: 0,
    });
  };
  return (
    <>
      <Text ta={"center"} mt={"md"}>
        Kode Voucher
      </Text>
      <Input
        placeholder="Masukkan Kode Voucher"
        onChange={(e) => handleChangeDiscount(e.target.value)}
        rightSectionPointerEvents="all"
        mt={4}
        rightSection={<IconDiscount2 aria-label="Clear input" />}
      />
    </>
  );
}
