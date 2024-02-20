/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Select, Text, TextInput } from "@mantine/core";

import * as yup from "yup";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { countryData, fetcher } from "@/utils/helper";
import { URL_API_CURRENCY, URL_API_EXCHANGE } from "@/contants";
import { IconBolt, IconBuildingBank, IconWallet } from "@tabler/icons-react";
import CardOption from "./calculator/CardOption";
import { useSendMoney } from "@/context/SendMoneyContext";
import InfoBox from "./calculator/InfoBox";
import useStepStore from "@/hooks/useStepStore";
import { IconHourglassFilled } from "@tabler/icons-react";
import { IFormValuesCalculator } from "@/interfaces";

const schema = yup.object().shape({
  country: yup.string().required("Pilih negara tujuan"),
  senderAmount: yup.string().required("Masukkan jumlah pengiriman"),
  receiverAmount: yup.string().required("Masukkan jumlah penerima"),
  paymentMethod: yup.string().required("Pilih metode pembayaran"),
  mode: yup.string().required("Pilih mode pengiriman"),
});

export default function Calculator() {
  const { isLoading: isLoadCurrency, data: currency } = useQuery({
    queryKey: "currency",
    queryFn: () => fetcher(URL_API_CURRENCY),
  });
  const { isLoading: isLoadExchange, data: exchange } = useQuery({
    queryKey: "exchange",
    queryFn: () => fetcher(URL_API_EXCHANGE),
  });
  const converstionRate = exchange?.data?.conversion_rates;

  const { formValues, setFormValues } = useSendMoney();
  const { nextStep } = useStepStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormValuesCalculator>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      mode: "normal",
      paymentMethod: "transfer",
    },
  });

  useEffect(() => {
    setValue("country", formValues?.calculator?.country);
    setValue("mode", formValues?.calculator?.mode);
    setValue("paymentMethod", formValues?.calculator?.paymentMethod);
    setValue("receiverAmount", formValues?.calculator?.receiverAmount);
    setValue("senderAmount", formValues?.calculator?.senderAmount);
  }, [formValues]);

  // useEffect(() => {
  //   if (watch("senderAmount") && converstionRate) {
  //     const multiplyMoneyValue = (
  //       +watch("senderAmount") * converstionRate[watch("country")]
  //     ).toFixed(2);
  //     setValue("receiverAmount", multiplyMoneyValue);
  //   }
  // }, [watch("senderAmount"), converstionRate, watch("country")]);

  // useEffect(() => {
  //   if (watch("receiverAmount") && converstionRate && !watch('senderAmount')) {
  //     const multiplyMoneyValue = (
  //       +watch("receiverAmount") * converstionRate['IDR']
  //     ).toFixed(2);
  //     setValue("senderAmount", multiplyMoneyValue);
  //   }
  // }, [watch("receiverAmount"), converstionRate, watch("country")]);

  useEffect(() => {
    const calculateReceiverAmount = () => {
      const receiverAmount = Math.round(
        +watch("senderAmount") * +converstionRate[watch("country")]
      );
      setValue("receiverAmount", String(receiverAmount));
    };
    if (watch("senderAmount")) {
      calculateReceiverAmount();
    }
  }, [watch("senderAmount")]);

  useEffect(() => {
    const calculateSenderAmount = () => {
      const senderAmount = Math.round(
        +watch("receiverAmount") / +converstionRate[watch("country")]
      );
      setValue("senderAmount", String(senderAmount));
    };

    if (watch("receiverAmount")) {
      calculateSenderAmount();
    }
  }, [watch("receiverAmount"), watch("country")]);

  if (isLoadCurrency || isLoadExchange) return;

  const onSubmit = (data: IFormValuesCalculator) => {
    const findContryName = countryData(currency?.data).filter(
      (country: any) => country?.value === data?.country
    )?.[0];
    const getTheNameCountry = findContryName?.label?.split("-");
    setFormValues({
      ...formValues,
      calculator: { ...data },
      countryName: getTheNameCountry[1],
      totalTransfer: +data?.senderAmount + (data.mode == "instant" ? 5000 : 0),
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            mt={40}
            label="Pilih Negara"
            placeholder="Pilih Negara Tujuan"
            data={countryData(currency?.data)}
            searchable
            error={errors.country?.message}
          />
        )}
      />
      <Controller
        name="senderAmount"
        control={control}
        disabled={!watch("country")}
        defaultValue=""
        render={({ field }) => (
          <TextInput
            {...field}
            mt={25}
            type="number"
            disabled={!watch("country")}
            label="Jumlah Pengiriman"
            leftSection={<p style={{ fontSize: 12 }}>IDR</p>}
            error={errors.senderAmount?.message}
          />
        )}
      />
      <Controller
        name="receiverAmount"
        control={control}
        disabled={!watch("country")}
        render={({ field }) => (
          <TextInput
            {...field}
            mt={25}
            type="number"
            disabled={!watch("country")}
            label="Jumlah Penerima"
            leftSection={
              <p style={{ fontSize: 12 }}>{watch("country") || "IDR"}</p>
            }
            error={errors?.receiverAmount?.message}
          />
        )}
      />

      {watch("receiverAmount") && watch("senderAmount") && (
        <>
          <InfoBox
            title="Penerima Akan Mendapatkan:"
            value={`${watch("receiverAmount")} ${watch("country")}`}
          />
          <Box>
            <Text mb={15}>Pilih Pembayaran:</Text>
            <CardOption
              icon={<IconBuildingBank />}
              title="Transfer"
              description="Uang dikirim ke rekening bank penerima"
              onClick={() => setValue("paymentMethod", "transfer")}
              checked={watch("paymentMethod") === "transfer"}
            />
            <CardOption
              icon={<IconWallet />}
              title="E-wallet"
              description="Uang dikirim ke E-wallet penerima"
              onClick={() => setValue("paymentMethod", "e-wallet")}
              checked={watch("paymentMethod") === "e-wallet"}
            />
          </Box>
          <Box mt="xl">
            <Text mb={15}>Pilih Mode:</Text>
            <CardOption
              icon={<IconHourglassFilled />}
              title="Normal"
              description="Uang dikirim 3 - 4 jam setelah transaksi"
              onClick={() => setValue("mode", "normal")}
              checked={watch("mode") === "normal"}
            />
            <CardOption
              icon={<IconBolt />}
              title="Instant"
              description="Uang langsung masuk ke penerima"
              onClick={() => setValue("mode", "instant")}
              checked={watch("mode") === "instant"}
            />
          </Box>
          <InfoBox
            title="Total Transfer"
            value={`Rp
              ${Number(
                +watch("senderAmount") +
                  (watch("mode") === "instant" ? 5000 : 0)
              ).toLocaleString()}`}
          />
        </>
      )}

      <Button fullWidth mt={20} type="submit">
        Berikutnya
      </Button>
    </form>
  );
}
