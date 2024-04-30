import { styled } from "styled-components";
import BankListBottomSheet from "../components/tuitionPayment/BankListBottomSheet";
import Footer from "../components/tuitionPayment/Footer";
import Header from "../components/tuitionPayment/Header";
import PaymentInput from "../components/tuitionPayment/PaymentInput";
import useModal from "../hooks/useModal";

export default function TuitionPayment() {
  const { openModal } = useModal();
  return (
    <>
      {openModal && <BankListBottomSheet />}
      <PaymentWrapper>
        <Header />
        <PaymentInput />
        <Footer />
      </PaymentWrapper>
    </>
  );
}

const PaymentWrapper = styled.main`
  overflow-y: scroll;
`;
