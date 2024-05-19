import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import useGetDepositRecord from "../../hooks/useGetDepositRecord";
import { DepositInfoType } from "../../type/lessonRecord/lessonRecord";
import DepositRecordItem from "./DepositRecordItem";
import NoDeposit from "./NoDeposit";

export default function DepositRecordList() {
  const { lessonId } = useParams();
  const { paymentRecordList } = useGetDepositRecord(Number(lessonId));

  return paymentRecordList ? (
    <>
      <DepositRecordListWrapper>
        {paymentRecordList?.map(({ idx, date, amount, status }: DepositInfoType, index: number) => {
          return (
            <DepositRecordItem
              count={Math.abs(index - paymentRecordList?.length)}
              key={idx}
              idx={idx}
              date={date}
              amount={amount}
              status={status}
            />
          );
        })}
      </DepositRecordListWrapper>
    </>
  ) : (
    <NoDeposit />
  );
}

const DepositRecordListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2.4rem;
`;
