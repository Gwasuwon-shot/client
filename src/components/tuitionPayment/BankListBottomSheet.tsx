import styled from "styled-components";
import {
  BankNameBNP파리바Ic,
  BankNameBOAIc,
  BankNameHSBCIc,
  BankNameIBK기업Ic,
  BankNameJP모건Ic,
  BankNameKB국민Ic,
  BankNameNH농협Ic,
  BankNameSC제일Ic,
  BankName경남Ic,
  BankName광주Ic,
  BankName대구Ic,
  BankName도이치Ic,
  BankName부산Ic,
  BankName산림조합Ic,
  BankName새마을Ic,
  BankName수협Ic,
  BankName신한Ic,
  BankName신협Ic,
  BankName씨티Ic,
  BankName우리Ic,
  BankName우체국Ic,
  BankName저축은행Ic,
  BankName전북Ic,
  BankName제주Ic,
  BankName중국Ic,
  BankName중국건설Ic,
  BankName중국공상Ic,
  BankName카카오뱅크Ic,
  BankName케이_뱅크Ic,
  BankName토스뱅크Ic,
  BankName하나Ic,
} from "../../assets";

import { useSetRecoilState } from "recoil";
import { bankName } from "../../atom/tuitionPayment/tuitionPayment";
import useModal from "../../hooks/useModal";
import { ToastModal } from "../common";

export default function BankListBottomSheet() {
  const { unShowModal } = useModal();
  const setBankName = useSetRecoilState(bankName);

  function handleCancelAttendanceCheck() {
    unShowModal();
  }

  function handleClickBank(e: React.MouseEvent<HTMLDivElement>) {
    setBankName(e?.currentTarget?.textContent || "");
    unShowModal();
  }

  return (
    <ToastModal>
      <ModalHeaderWrapper>
        <CancelButton onClick={handleCancelAttendanceCheck}>취소</CancelButton>
        <ModalHeader>은행 선택</ModalHeader>
      </ModalHeaderWrapper>
      <ContentsWrapper>
        <TextWrapper>
          {BANKS.map((bank, index) => (
            <BankButtonBg key={index} onClick={(e) => handleClickBank(e)}>
              {bank.ic}
              <p>{bank.name}</p>
            </BankButtonBg>
          ))}
        </TextWrapper>
      </ContentsWrapper>
    </ToastModal>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const TextWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  height: 36rem;
  overflow-y: scroll;
`;

const BankButtonBg = styled.div`
  border-radius: 0.8rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 7.5rem;
  height: 6.2rem;
  background-color: ${({ theme }) => theme.colors.grey50};
  ${({ theme }) => theme.fonts.caption02};
`;

const CancelButton = styled.button`
  color: ${({ theme }) => theme.colors.grey400};
  ${({ theme }) => theme.fonts.body02};
`;

const ModalHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;

  width: 17rem;
  margin-bottom: 0.4rem;
  margin-left: -10rem;
`;

const ModalHeader = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;

const BANKS = [
  { name: "NH농협은행", ic: <BankNameNH농협Ic /> },
  { name: "KB국민은행", ic: <BankNameKB국민Ic /> },
  { name: "IBK기업은행", ic: <BankNameIBK기업Ic /> },
  { name: "신한은행", ic: <BankName신한Ic /> },
  { name: "우리은행", ic: <BankName우리Ic /> },
  { name: "하나은행", ic: <BankName하나Ic /> },
  { name: "카카오뱅크", ic: <BankName카카오뱅크Ic /> },
  { name: "케이뱅크", ic: <BankName케이_뱅크Ic /> },
  { name: "토스뱅크", ic: <BankName토스뱅크Ic /> },
  { name: "SC제일은행", ic: <BankNameSC제일Ic /> },
  { name: "경남은행", ic: <BankName경남Ic /> },
  { name: "광주은행", ic: <BankName광주Ic /> },
  { name: "대구은행", ic: <BankName대구Ic /> },
  { name: "부산은행", ic: <BankName부산Ic /> },
  { name: "수협은행", ic: <BankName수협Ic /> },
  { name: "전북은행", ic: <BankName전북Ic /> },
  { name: "제주은행", ic: <BankName제주Ic /> },
  { name: "한국시티은행", ic: <BankName씨티Ic /> },
  { name: "새마을금고", ic: <BankName새마을Ic /> },
  { name: "신협", ic: <BankName신협Ic /> },
  { name: "상호저축은행", ic: <BankName저축은행Ic /> },
  { name: "산림조합", ic: <BankName산림조합Ic /> },
  { name: "우체국", ic: <BankName우체국Ic /> },
  { name: "도이치은행", ic: <BankName도이치Ic /> },
  { name: "뱅크오브아메리카", ic: <BankNameBOAIc /> },
  { name: "중국공상은행", ic: <BankName중국공상Ic /> },
  { name: "중국건설은행", ic: <BankName중국건설Ic /> },
  { name: "중국은행", ic: <BankName중국Ic /> },
  { name: "BNP파리바은행", ic: <BankNameBNP파리바Ic /> },
  { name: "HSBC은행", ic: <BankNameHSBCIc /> },
  { name: "JP모건", ic: <BankNameJP모건Ic /> },
];
