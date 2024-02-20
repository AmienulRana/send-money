import { SendMoneyContextType } from "@/context/SendMoneyContext";
import DetailItem from "./DetailItem";
import { WrapperConfirm } from "../ConfirmationTransaction";

export default function ReceiveDetail({ formValues }: SendMoneyContextType) {
  return (
    <WrapperConfirm>
      <DetailItem
        label="Nama Lengkap"
        value={formValues?.receivedBank?.fullName}
      />
      <DetailItem
        label="Nomor Rekening"
        value={formValues?.receivedBank?.noRekening}
      />
      <DetailItem
        label="Nama Bank"
        value={formValues?.receivedBank?.bankName}
      />
      <DetailItem
        label="Tujuan Transaksi"
        value={formValues?.receivedBank?.purposeTransaction}
      />
      {formValues?.receivedBank?.email && (
        <DetailItem label="Email" value={formValues?.receivedBank?.email} />
      )}
      <DetailItem
        label="Keterangan"
        value={formValues?.receivedBank?.description || "-"}
      />
    </WrapperConfirm>
  );
}
