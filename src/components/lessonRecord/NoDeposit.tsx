import { styled } from "styled-components";
import { EmptyDepositParentsLessonRecordIc } from "../../assets";

export default function NoDeposit() {
  return (
    <NoDepositWrapper>
      <NoDepositTitle>아직 등록된 입금이 없어요</NoDepositTitle>
      <NoDepositSubTitle>수업 출결을 등록하고 결실을 수확하세요</NoDepositSubTitle>
      <EmptyDepositIcon />
    </NoDepositWrapper>
  );
}

const NoDepositWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 10.8rem;
`;

const NoDepositTitle = styled.h1`
  margin-bottom: 0.8rem;

  ${({ theme }) => theme.fonts.title02};
  color: ${({ theme }) => theme.colors.green5};
`;

const NoDepositSubTitle = styled.h2`
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.fonts.body07};
  color: ${({ theme }) => theme.colors.grey600};
`;

const EmptyDepositIcon = styled(EmptyDepositParentsLessonRecordIc)`
  width: 8.4rem;
`;
