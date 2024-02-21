/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Select, Text, TextInput } from "@mantine/core";

import * as yup from "yup";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { countryData, currencyFormatIDR, fetcher } from "@/utils/helper";
import { URL_API_CURRENCY, URL_API_EXCHANGE } from "@/contants";
import { IconBolt, IconBuildingBank, IconWallet } from "@tabler/icons-react";
import CardOption from "./calculator/CardOption";
import { useSendMoney } from "@/context/SendMoneyContext";
import InfoBox from "./calculator/InfoBox";
import useStepStore from "@/hooks/useStepStore";
import { IconHourglassFilled } from "@tabler/icons-react";
import { IFormValuesCalculator } from "@/interfaces";
import { NumericFormat } from "react-number-format";

const schema = yup.object().shape({
  country: yup.string().required("Pilih negara tujuan"),
  senderAmount: yup
    .string()
    .max(20000000, "Jumlah pengiriman tidak boleh melebihi 20 juta")
    .required("Masukkan jumlah pengiriman"),
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
    setError
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

  useEffect(() => {
    const senderAmount = watch("senderAmount");
    if (senderAmount === "") {
      return setValue("receiverAmount", "");
    }

    if (watch("country") && converstionRate) {
      const calculateReceiverAmount = () => {
        const receiverAmount =
          Number(senderAmount) * Number(converstionRate[watch("country")]);
          setValue("receiverAmount", String(receiverAmount));
          setError('receiverAmount', {message: ''})

      };
      if (senderAmount) {
        calculateReceiverAmount();
      }
    }
  }, [watch("senderAmount"), converstionRate, watch("country")]);

  useEffect(() => {
    const receiverAmount = watch("receiverAmount");
    if (receiverAmount === "") {
      return setValue("senderAmount", "");
    }
    if (watch("country") && converstionRate) {
      const calculateSenderAmount = () => {
        const senderAmount =
          +watch('receiverAmount') / +converstionRate[watch("country")];
            setValue('senderAmount', String(senderAmount));
          setError('senderAmount', {message: ''})

      };

      if (receiverAmount) {
        calculateSenderAmount();
      }
    }
  }, [watch("receiverAmount"), watch("country"), watch("senderAmount")]);

  if (isLoadCurrency || isLoadExchange) return;

  const onSubmit = (data: IFormValuesCalculator) => {
    const findContryName = countryData(currency?.data).filter(
      (country: any) => country?.value === data?.country
    )?.[0];
    const getTheNameCountry = findContryName?.label?.split("-");
    setFormValues({
      ...formValues,
      calculator: { ...data, receiveRealNumber: watch('receiveRealNumber') },
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
          <NumericFormat
            {...field}
            customInput={TextInput}
            error={errors?.senderAmount?.message}
            label="Jumlah Pengiriman"
            mt={20}
            leftSection={<p style={{ fontSize: 12 }}>IDR</p>}
            allowNegative={false}
            decimalScale={0}
          />
        )}
      />
      <Controller
        name="receiverAmount"
        control={control}
        disabled={!watch("country")}
        render={({ field }) => (
          <NumericFormat
            {...field}
            customInput={TextInput}
            error={errors?.receiverAmount?.message}
            label="Jumlah Penerima"
            mt={20}
            leftSection={
              <p style={{ fontSize: 12 }}>{watch("country") || "IDR"}</p>
            }
            // thousandSeparator=","
          />
        )}
      />

      {watch("receiverAmount") && watch("senderAmount") && (
        <>
          <InfoBox
            title="Penerima Akan Mendapatkan:"
            value={`${Number(watch("receiverAmount")).toFixed(2)} ${watch(
              "country"
            )}`}
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
            value={`Rp${currencyFormatIDR(Number(
                +watch("senderAmount") +
                  (watch("mode") === "instant" ? 5000 : 0)
              ))}`}
          />
        </>
      )}

      <Button fullWidth mt={20} type="submit">
        Berikutnya
      </Button>
    </form>
  );
}
