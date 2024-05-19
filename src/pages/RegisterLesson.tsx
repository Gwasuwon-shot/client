import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { paymentOrder } from "../atom/tuitionPayment/tuitionPayment";
import Footer from "../components/RegisterLessonPage/Footer";
import Header from "../components/RegisterLessonPage/Header";
import LessonInput from "../components/RegisterLessonPage/LessonInput";

export default function RegisterLesson() {
  const [payment, setPayment] = useRecoilState(paymentOrder);

  useEffect(() => {
    setPayment("");
  }, []);

  return (
    <>
      <Header />
      <LessonInput />
      <Footer />
    </>
  );
}
