import { SendMoneyContextType } from "@/context/SendMoneyContext";
import { Input, Text } from "@mantine/core";
import { IconDiscount2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function CodeVoucher({ formValues, setFormValues }: SendMoneyContextType) {
  const [codeVoucher, setCodeVoucher] = useState('');

  const handleChangeDiscount = (value: string) => {
    setCodeVoucher(value)
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

  useEffect(() => {
    setCodeVoucher(formValues?.discount === 5000 ? 'LIMARIBU' : formValues?.discount === 10000 ?  'SEPULUHRIBU' : codeVoucher)
  }, [formValues])
  return (
    <>
      <Text ta={"center"} mt={"md"}>
        Kode Voucher
      </Text>
      <Input
        value={codeVoucher}
        placeholder="Masukkan Kode Voucher"
        onChange={(e) => handleChangeDiscount(e.target.value)}
        rightSectionPointerEvents="all"
        mt={4}
        rightSection={<IconDiscount2 aria-label="Clear input" />}
      />
    </>
  );
}
