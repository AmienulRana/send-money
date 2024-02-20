import { IFormValuesBank, IFormValuesCalculator } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface ISendMoneyContext {
  calculator: IFormValuesCalculator;
  receivedBank: IFormValuesBank;
  totalTransfer: number;
  countryName: string;
  discount: 5000 | 10000 | 0;
  status: 'success' | 'pending' | 'failed' | ''
}

export interface SendMoneyContextType {
  formValues: ISendMoneyContext;
  setFormValues: React.Dispatch<React.SetStateAction<ISendMoneyContext>>;
  resetFormValues?: () => void;
}

const SendMoneyContext = createContext<SendMoneyContextType | undefined>(
  undefined
);

export const SendMoneyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formValues, setFormValues] = useState<ISendMoneyContext>({
    calculator: {
      country: "",
      senderAmount: "",
      receiverAmount: "",
      paymentMethod: "transfer",
      mode: "normal",
    },
    receivedBank: {
        bankName: "",
        noRekening: "",
      fullName: "",
      purposeTransaction: "",
      email: "",
      description: "",
    },
    countryName: "",
    totalTransfer: 0,
    discount: 0,
    status: '',
  });

  const resetFormValues = () => {
    setFormValues({
      calculator: {
        country: "",
        senderAmount: "",
        receiverAmount: "",
        paymentMethod: "transfer",
        mode: "normal",
      },
      receivedBank: {
        bankName: "",
        noRekening: "",
        fullName: "",
        purposeTransaction: "",
        email: "",
        description: "",
      },
      countryName: "",
      totalTransfer: 0,
      discount: 0,
      status: '',
    });
  };
  

  useEffect(() => {
      const cacheData = JSON.parse(localStorage.getItem('formValues') as string);
      if(!cacheData){
        localStorage.setItem('formValues', JSON.stringify(formValues));
      }
  }, [formValues])
  

  return (
    <SendMoneyContext.Provider value={{ formValues, setFormValues, resetFormValues }}>
      {children}
    </SendMoneyContext.Provider>
  );
};

export const useSendMoney = () => {
  const context = useContext(SendMoneyContext);
  if (!context) {
    throw new Error("useSendMoney must be used within a SendMoneyProvider");
  }
  return context;
};
