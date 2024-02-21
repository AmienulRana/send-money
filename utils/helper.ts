import axios from "axios";

export const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response;
};

export const countryData = (currency: any) => {
  const countryRate = Object?.entries(currency).map(
    ([key, country]) => {
      
      const contryArr =  String(country)?.split(' ');
      contryArr?.pop();
    return ({
      value: key,
      label: `${key} - ${contryArr?.join(' ')}`,
    })}
  );
  const removeUndefined = countryRate?.filter(
    (country) => country?.label && !country.label.includes("undefined") && !country.label.includes("BTC") 
  );

  return removeUndefined;
};


export const currencyFormatIDR = (value: number | string) => {
  return Number(value || 0).toLocaleString('id-ID', {minimumFractionDigits: 0}).split(',')?.[0]
}
