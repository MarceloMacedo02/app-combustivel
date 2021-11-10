 

import moment from "moment";

export const formatPrice = (price: number) => {

    const params = {maximumFractionDigits: 2, minimumFractionDigits: 2};
    return new Intl.NumberFormat('pt-BR', params).format(price);
}
export const formatDate = (data: Date) => {
    const paramsdata = { year: "numeric",    month: "long",    day: "2-digit"};
    return moment(data).format('DD/MM/YYYY h:mm:ss a');// new Intl.DateTimeFormat('pt-BR').format(data);
}
export const mask = (v: string) => {
    v = v.replace(/\D/g, "")
  
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else {
      if (v.length <= 15) {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2")
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
      v = v.replace(/(\d{4})(\d)/, "$1-$2")}
    }
  
    return v
  }