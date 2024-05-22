import { useResetRecoilState } from "recoil";
import { studentNameState, subjectNameState } from "../../atom/common/datePicker";
import { cycleNumberState, dateState, firstLessonDay, focusDayState } from "../../atom/timePicker/timePicker";
import {
  accountNumber,
  bankName,
  moneyAmount,
  payingPersonName,
  paymentOrder,
} from "../../atom/tuitionPayment/tuitionPayment";

const useResetAllRecoilStates = () => {
  const resetCycleNumber = useResetRecoilState(cycleNumberState);
  const resetDate = useResetRecoilState(dateState);
  const resetDay = useResetRecoilState(dateState);
  const resetFirstLessonDay = useResetRecoilState(firstLessonDay);
  const resetFocusDay = useResetRecoilState(focusDayState);
  const resetStudentName = useResetRecoilState(studentNameState);
  const resetSubjectName = useResetRecoilState(subjectNameState);
  const resetAccountNumber = useResetRecoilState(accountNumber);
  const resetBankName = useResetRecoilState(bankName);
  const resetMoneyAmount = useResetRecoilState(moneyAmount);
  const resetPayingPersonName = useResetRecoilState(payingPersonName);
  const resetPaymentOrder = useResetRecoilState(paymentOrder);

  const resetAllStates = () => {
    resetCycleNumber();
    resetDate();
    resetDay();
    resetFirstLessonDay();
    resetFocusDay();
    resetStudentName();
    resetSubjectName();
    resetAccountNumber();
    resetBankName();
    resetMoneyAmount();
    resetPayingPersonName();
    resetPaymentOrder();
  };

  return resetAllStates;
};

export default useResetAllRecoilStates;
