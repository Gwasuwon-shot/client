import { useSetRecoilState } from "recoil";
import { studentNameState, subjectNameState } from "../../atom/common/datePicker";
import { cycleNumberState, dateState, dayState } from "../../atom/timePicker/timePicker";
import {
  accountNumber,
  bankName,
  lessonCodeAndPaymentId,
  moneyAmount,
  paymentOrder,
} from "../../atom/tuitionPayment/tuitionPayment";

export default function resetCreateLessonState() {
  const resetStudentName = useSetRecoilState(studentNameState);
  const resetSubjectName = useSetRecoilState(subjectNameState);
  const resetPaymentOrder = useSetRecoilState(paymentOrder);
  const resetMoneyAmount = useSetRecoilState(moneyAmount);
  const resetCycleNumber = useSetRecoilState(cycleNumberState);
  const resetDate = useSetRecoilState(dateState);
  const resetDayState = useSetRecoilState(dayState);
  const resetBankName = useSetRecoilState(bankName);
  const resetAccountNumber = useSetRecoilState(accountNumber);
  const resetCodeAndId = useSetRecoilState(lessonCodeAndPaymentId);

  return function resetAll() {
    resetStudentName("");
    resetSubjectName("");
    resetPaymentOrder("");
    resetMoneyAmount(0);
    resetCycleNumber(0);
    resetDate({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: new Date().getDate() });
    resetDayState([]);
    resetBankName("");
    resetAccountNumber("");
    // resetCodeAndId({ lessonCode: "", paymentId: "" }); // Assuming this is an object, update according to your state model.
  };
}
