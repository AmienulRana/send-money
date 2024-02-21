import { SendMoneyContextType } from "@/context/SendMoneyContext";
import DetailItem from "./DetailItem";
import { WrapperConfirm } from "../ConfirmationTransaction";
import { currencyFormatIDR } from "@/utils/helper";

export default function SenderDetail({ formValues }: SendMoneyContextType) {
  return (
    <WrapperConfirm>
      <DetailItem label="Negara Tujuan" value={formValues?.countryName} />
      <DetailItem
        label="Uang yang dikirim"
        value={`Rp ${currencyFormatIDR(formValues?.calculator?.senderAmount)}`}
      />
      <DetailItem
        label="Uang yang diterima"
        value={`${formValues?.calculator?.country} ${formValues?.calculator?.receiverAmount}`}
      />
      <DetailItem
        label="Metode Pembayaran"
        value={formValues?.calculator?.paymentMethod}
      />
      <DetailItem label="Mode" value={formValues?.calculator?.mode} />
    </WrapperConfirm>
  );
}
