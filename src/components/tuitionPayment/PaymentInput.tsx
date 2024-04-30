import { ChangeEvent, useState } from "react";
import {
  RegisterLessonInputIc,
  RightArrowParentsHomeIc,
  TuitionPaymentRadioButtonCheckedIc,
  TuitionPaymentRadioButtonNotCheckedIc,
} from "../../assets";
import { accountNumber, bankName, moneyAmount, paymentOrder } from "../../atom/tuitionPayment/tuitionPayment";

import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import useModal from "../../hooks/useModal";

interface AccountInputSectionProp {
  $accountFocused: boolean;
}

interface BankProp {
  $bankFocused: boolean;
}

interface MoneyProp {
  $moneyFocused: boolean;
}

export default function PaymentInput() {
  const { showModal } = useModal();
  // 1. 입금자명
  // const [isNameInputFocused, setNameInputFocused] = useState(false);
  // const [personName, setPersonName] = useRecoilState<string>(payingPersonName);

  // function handleNameInputFocus() {
  //   setNameInputFocused(true);

  //   setMoneyFocused(false);
  //   setAccountNumInputFocused(false);
  // }

  // function handleNameInputChange(event: ChangeEvent<HTMLInputElement>) {
  //   setPersonName(event.target.value);
  // }

  // 2. 계좌번호
  const [isAccountNumInputFocused, setAccountNumInputFocused] = useState(false);
  const [accountNum, setAccountNum] = useRecoilState<string>(accountNumber);

  function handleAccountNumInputFocus() {
    // setNameInputFocused(false);
    setMoneyFocused(false);
    setAccountNumInputFocused(true);
  }

  function handleAccountNumInputChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const numericValue = Number(inputValue);

    if (!isNaN(numericValue)) {
      setAccountNum(numericValue.toString());
    }
  }

  //3. 은행명
  const bank = useRecoilValue(bankName);

  // 4. 과외비

  const [isMoneyFocused, setMoneyFocused] = useState(false);
  const [money, setMoney] = useRecoilState<number>(moneyAmount);

  function handleMoneyFocus() {
    // setNameInputFocused(false);
    setAccountNumInputFocused(false);
    setMoneyFocused(true);
  }

  function handleMoneyChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const strippedValue = inputValue.replace(/,/g, "").replace("원", "");
    const numericValue = Number(strippedValue);

    if (!isNaN(numericValue)) {
      setMoney(numericValue);
    }
  }

  // 5. checkbox
  const [order, setOrder] = useRecoilState<string>(paymentOrder);

  const handleFirstChange = () => {
    setOrder("선불");
  };

  const handleLastChange = () => {
    setOrder("후불");
  };

  // 삭제

  // function handleNameDelete() {
  //   setPersonName("");
  // }

  function handleAccountDelete() {
    setAccountNum("");
  }

  function handleMoneyDelete() {
    setMoney(0);
  }

  function handleOrder() {
    // setNameInputFocused(false);
    setAccountNumInputFocused(false);
    setMoneyFocused(false);
  }

  return (
    <>
      <InputWrapper>
        {/* <NameInputSection $nameFocused={isNameInputFocused}>
          <InputName> 입금자명 </InputName>
          <NameInput
            type="text"
            placeholder="실명을 입력해주세요"
            value={personName}
            onChange={handleNameInputChange}
            onFocus={handleNameInputFocus}
          />
          {isNameInputFocused && <RegisterLessonInputIcon onClick={handleNameDelete} />}
        </NameInputSection> */}

        <AccountInputSection $accountFocused={isAccountNumInputFocused}>
          <InputName> 계좌번호 </InputName>
          <AccountInput
            type="text"
            placeholder="계좌번호 입력"
            value={accountNum}
            onChange={handleAccountNumInputChange}
            onFocus={handleAccountNumInputFocus}
          />
          {isAccountNumInputFocused && <RegisterLessonInputIcon onClick={handleAccountDelete} />}
        </AccountInputSection>

        <BankInputSection>
          <InputName> 은행명 </InputName>
          <BankInput value={bank} disabled={true} type="text" placeholder={"은행 선택"} />
          <RightArrowParentsHomeIcon onClick={showModal} />
        </BankInputSection>

        <MoneyInputSection $moneyFocused={isMoneyFocused}>
          <InputName> 회차당 과외비 </InputName>
          <MoneyInput
            placeholder="금액 입력"
            value={money === 0 ? "" : money.toLocaleString() + "원"}
            onChange={handleMoneyChange}
            onFocus={handleMoneyFocus}
          />
          {isMoneyFocused && <RegisterLessonInputIcon onClick={handleMoneyDelete} />}
        </MoneyInputSection>

        <CheckboxWrapper>
          <CheckboxHeader> 입금 방식</CheckboxHeader>
          <CheckboxLabel onClick={handleOrder}>
            <CheckboxInput type="checkbox" checked={order === "선불"} onChange={handleFirstChange} />
            {order === "선불" ? (
              <CheckboxIcon as={TuitionPaymentRadioButtonCheckedIc} />
            ) : (
              <CheckboxIcon as={TuitionPaymentRadioButtonNotCheckedIc} />
            )}
            <CheckboxP> 선불 </CheckboxP>
          </CheckboxLabel>
          <CheckboxLabel onClick={handleOrder}>
            <CheckboxInput type="checkbox" checked={order === "후불"} onChange={handleLastChange} />
            {order === "후불" ? (
              <CheckboxIcon as={TuitionPaymentRadioButtonCheckedIc} />
            ) : (
              <CheckboxIcon as={TuitionPaymentRadioButtonNotCheckedIc} />
            )}
            <CheckboxP> 후불 </CheckboxP>
          </CheckboxLabel>
        </CheckboxWrapper>
      </InputWrapper>
    </>
  );
}

interface NameInputSectionProp {
  $nameFocused: boolean;
}

const RightArrowParentsHomeIcon = styled(RightArrowParentsHomeIc)`
  transform: rotate(90deg);
  position: absolute;
  bottom: 0.7rem;
  right: 1.1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;
`;

const NameInputSection = styled.section<NameInputSectionProp>`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 29.2rem;
  height: 5.6rem;
  margin-bottom: 1.3rem;

  border-bottom: 1px solid ${({ theme, $nameFocused }) => ($nameFocused ? theme.colors.green5 : theme.colors.grey70)};
`;

const AccountInputSection = styled.section<AccountInputSectionProp>`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 29.2rem;
  height: 5.6rem;
  margin-bottom: 1.3rem;

  border-bottom: 1px solid
    ${({ theme, $accountFocused }) => ($accountFocused ? theme.colors.green5 : theme.colors.grey70)};
`;

const InputName = styled.h1`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey300};
`;

const NameInput = styled.input`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey700};
  &textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const AccountInput = styled.input`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey700};
  &textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const BankInputSection = styled.section`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 29.2rem;
  height: 5.6rem;
  margin-bottom: 1.3rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey70};
`;

const BankInput = styled.input`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey700};
  &textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const MoneyInputSection = styled.section<MoneyProp>`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 29.2rem;
  height: 5.6rem;
  margin-bottom: 1.3rem;

  border-bottom: 1px solid ${({ theme, $moneyFocused }) => ($moneyFocused ? theme.colors.green5 : theme.colors.grey70)};
`;

const MoneyInput = styled.input`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey700};
  &textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const RegisterLessonInputIcon = styled(RegisterLessonInputIc)`
  position: absolute;
  bottom: 0.7rem;
  right: 1.1rem;
`;

const CheckboxWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  width: 29.2rem;
  margin-top: 1.7rem;
`;

const CheckboxHeader = styled.h1`
  ${({ theme }) => theme.fonts.title02};
  color: ${({ theme }) => theme.colors.grey900};
`;

const CheckboxLabel = styled.label`
  display: flex;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  appearance: none;
`;

const CheckboxIcon = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 0.1rem;
  margin-right: 2rem;
`;

const CheckboxP = styled.p`
  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey900};
`;
