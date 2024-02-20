export interface ICardOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  checked: boolean;
}

export interface IInfoBox {
  title: string;
  value: string;
}

export interface IModalConfirm {
  opened: boolean;
  close: () => void;
}
export interface IFormValuesBank {
  bankName: string;
  noRekening: string;
  fullName: string;
  purposeTransaction:
    | "Investasi"
    | "Pemindahan Dana"
    | "Pembelian"
    | "Lainnya"
    | "";
  email: string;
  description: string;
}
export interface FormValuesBank {
  bankName: string;
  noRekening: string;
  fullName: string;
  purposeTransaction:
    | "Investasi"
    | "Pemindahan Dana"
    | "Pembelian"
    | "Lainnya"
    | "";
  email: string;
  description: string;
}

export interface IFormValuesCalculator {
  country: string;
  senderAmount: string;
  receiverAmount: string;
  paymentMethod: "transfer" | "e-wallet";
  mode: "instant" | "normal";
}

export interface IDetailItem {
  label: string;
  value: string;
}
