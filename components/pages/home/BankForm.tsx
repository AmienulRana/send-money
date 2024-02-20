/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStepStore from "@/hooks/useStepStore";
import { useSendMoney } from "@/context/SendMoneyContext";
import { useEffect } from "react";
import { IFormValuesBank } from "@/interfaces";

const schema = yup.object().shape({
  bankName: yup.string().required("Field ini wajib diisi"),
  noRekening: yup.string().required("Field ini wajib diisi"),
  fullName: yup.string().required("Field ini wajib diisi"),
  purposeTransaction: yup.string().required("Field ini wajib diisi"),
  email: yup.string(),
  description: yup
    .string()
    .max(225, "Keterangan harus kurang dari 255 karakter"),
});



export default function Calculator() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue
  } = useForm<IFormValuesBank>({
    resolver: yupResolver(schema) as any,
  });

  const {formValues, setFormValues} = useSendMoney();
  const { nextStep, prevStep } = useStepStore();

  const onSubmit = (data: IFormValuesBank) => {
    setFormValues({...formValues, receivedBank: {...data}})
    nextStep();
  };

  useEffect(() => {
    setValue('bankName', formValues?.receivedBank?.bankName)
    setValue('description', formValues?.receivedBank?.description)
    setValue('email', formValues?.receivedBank?.email)
    setValue('fullName', formValues?.receivedBank?.fullName)
    setValue('noRekening', formValues?.receivedBank?.noRekening)
    setValue('purposeTransaction', formValues?.receivedBank?.purposeTransaction)
  }, [formValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="bankName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextInput
            {...field}
            mt={25}
            label="Nama Bank"
            error={errors.bankName?.message}
          />
        )}
      />
      <Controller
        name="noRekening"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            mt={25}
            label="Nomor Rekening"
            error={errors?.noRekening?.message}
          />
        )}
      />
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            mt={25}
            label="Nama Lengkap"
            error={errors?.fullName?.message}
          />
        )}
      />

      <Controller
        name="purposeTransaction"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            mt={25}
            label="Tujuan Transaksi"
            placeholder="Pilih Tujuan Transaksi"
            data={["Investasi", "Pemindahan Dana", "Pembelian", "Lainnya"]}
            error={errors.purposeTransaction?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput {...field} mt={25} label="Email (opsional)" />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Masukan keterangan Anda (maks: 255 karakter)"
            label="Keterangan (Opsional)"
            mt={25}
            autosize
            maxLength={255}
            minRows={2}
          />
        )}
      />
      <Text ta={'end'} size="xs" mt={2}>{watch('description')?.length || 0} / 255</Text>

      <Flex align={"center"} justify={"space-between"} gap={10} mt={25}>
        <Button
          onClick={prevStep}
          fullWidth
          variant="light"
          type="submit"
        >
          Back
        </Button>
        <Button fullWidth type="submit">
          Berikutnya
        </Button>
      </Flex>
    </form>
  );
}
