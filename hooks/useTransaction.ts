import { ISendMoneyContext, useSendMoney } from "@/context/SendMoneyContext";
import { useEffect, useState } from "react";

export default function useTransaction(){
    const { formValues } = useSendMoney();

    const [transactionHistory, setTransactionHistory] = useState<ISendMoneyContext[]>();



    const getHistory = () => {
        return JSON.parse(localStorage.getItem('history') || <any>[]) ;
    }

    const submitTransaction  = () => {
        setTransactionHistory((prev: any) => [...prev, formValues]);
        localStorage.setItem('history', JSON.stringify([...getHistory() as any || [], formValues]));
    }

    useEffect(() => {
        setTransactionHistory(getHistory() as any[]);
    }, [])


    return { submitTransaction, transactionHistory, setTransactionHistory }
}