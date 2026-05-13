// UserOrderForm

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/app/hook";
import { type OrderState } from "../store/slices/orderSlice";
import { actionMap, type FormFieldName } from "../helpers/formActions";
import { sendToTelegram } from "../lib/telegram";
import { reachGoal } from "../lib/metrika";

export const useOrderForm = (bouquetName?: string) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(state => state.order as OrderState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Установка имени букета при монтировании
  useEffect(() => {
    const finalBouquetName = bouquetName ?? "Не указан";
    dispatch(actionMap.bouquetName(finalBouquetName));
  }, [bouquetName, dispatch]);

  // Обработка изменения полей
  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const action = actionMap[name as FormFieldName];
    if (action) {
      dispatch(action(value as never));
    }
  };

  // Отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const goalParams = {
      bouquetName: order.bouquetName,
      contactMethod: order.contactMethod,
    };

    reachGoal("form_submit", goalParams);
    reachGoal(`form_submit_${order.contactMethod}`, goalParams);

    sendToTelegram(order);
    setIsSubmitted(true);
  };

  return {
    order,
    isSubmitted,
    handleFormData,
    handleSubmit,
  };
};
