import { styled } from "styled-components";
import BottomButton from "../common/BottomButton";

interface EditFooterButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isActive: boolean;
  disabled: boolean;
}

export default function EditFooterButton(props: EditFooterButtonProps) {
  const { onClick, isActive, disabled } = props;

  return (
    <>
      <BottomButton disabled={disabled} isActive={isActive} onClick={onClick}>
        저장
      </BottomButton>
    </>
  );
}

const BottomWrapper = styled.div``;
