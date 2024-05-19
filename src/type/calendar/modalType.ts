import React from "react";

export interface modalType {
  selectedDate: Date;
  setOpenModal: (open: boolean) => void;
  formattedMonth: string;
}
