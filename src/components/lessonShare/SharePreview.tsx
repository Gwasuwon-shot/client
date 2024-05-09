import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CancelButton, SharePreviewImg } from "../../assets";

export default function SharePreview({ handleMoveToPage }: { handleMoveToPage: (page: string) => void }) {
  const navigate = useNavigate();

  return (
    <>
      <QuiteWrapper onClick={() => handleMoveToPage("M")}>
        <QuiteButton />
      </QuiteWrapper>
      <Title>
        튜티스 초대링크, <br /> 이렇게 보내져요
      </Title>
      <PreviewWrapper>
        <SharePreviewImage />
      </PreviewWrapper>
    </>
  );
}

const Title = styled.h1`
  margin-left: 1.4rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title01};
`;

const PreviewWrapper = styled.div`
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const SharePreviewImage = styled(SharePreviewImg)`
  width: 100%;
  height: 100%;
`;

const QuiteWrapper = styled.div`
  text-align: right;
  width: 100%;
`;

const QuiteButton = styled(CancelButton)`
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.3rem;
`;
