import { styled } from "styled-components";
import { GreyFruitPaymentIc, RedFruitPaymentIc } from "../../assets";
import { DEPOSIT_RECORD_IMG_LIST } from "../../core/Parents/DepositRecordImgSrc";
import useGetTodayDate from "../../hooks/useGetTodayDate";

interface DepositRecordItemProps {
  idx: number;
  date: string | null;
  status: boolean;
  amount: number;
  count: number;
}

export default function DepositRecordItem(props: DepositRecordItemProps) {
  const { idx, date, status, amount, count } = props;
  const appleImgSrc = status ? DEPOSIT_RECORD_IMG_LIST[1] : DEPOSIT_RECORD_IMG_LIST[0];
  const { todayDate } = useGetTodayDate();

  function checkRealDate(date: string | null) {
    return date !== null ? date : todayDate?.date;
  }

  const depositAmountToRender = amount.toLocaleString("ko-KR");

  return (
    <DepositRecordWrapper>
      {status ? <RedFruitPaymentIcon /> : <GreyFruitPaymentIcon />}
      <DepositInfoWrapper>
        <DepositCount>{count}번째 결실</DepositCount>

        <DepositDate>
          {new window.Date(checkRealDate(date)).getMonth() + 1}월 {new window.Date(checkRealDate(date)).getDate()}일
        </DepositDate>
      </DepositInfoWrapper>

      <DepositAmount>{status ? depositAmountToRender.toLocaleString() : "미입금"}</DepositAmount>
    </DepositRecordWrapper>
  );
}

const RedFruitPaymentIcon = styled(RedFruitPaymentIc)`
  width: 4.4rem;
  height: 5.4rem;
`;

const GreyFruitPaymentIcon = styled(GreyFruitPaymentIc)`
  width: 4.4rem;
  height: 5.4rem;
`;

const DepositRecordWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 29.2rem;
  padding: 0.8rem 0 0.8rem 0.6rem;
  margin-bottom: 2rem;
`;

const DepositInfoWrapper = styled.div``;

const DepositCount = styled.p`
  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey900};
`;

const DepositDate = styled.time`
  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey600};
`;

const DepositAmount = styled.strong`
  display: flex;
  justify-content: flex-end;

  width: 15rem;
  padding-right: 0.5rem;

  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey600};
`;
