import { notification } from "antd";
import moment from "moment";

export const formatPrice = (price: number) => {

    const params = {maximumFractionDigits: 2, minimumFractionDigits: 2};
    return new Intl.NumberFormat('pt-BR', params).format(price);
}
export const formatDate = (data: Date) => {
    const paramsdata = { year: "numeric",    month: "long",    day: "2-digit"};
    return moment(data).format('DD/MM/YYYY h:mm:ss a');// new Intl.DateTimeFormat('pt-BR').format(data);
}
export const samplFormatDate = (data: Date) => {
    const paramsdata = { year: "numeric",    month: "long",    day: "2-digit"};
    return moment(data).format('DD/MM/YYYY');// new Intl.DateTimeFormat('pt-BR').format(data);
}

export const openNotificationWithIcon = (type,title,msg) => {
    notification[type]({
      message: title,
      description:msg,
      placement:'bottomRight'
    });
  };
  