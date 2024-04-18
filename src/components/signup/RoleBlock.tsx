import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import RoleCheckSignupIc from "../../assets/icon/RoleCheckSignupIc.svg";
import RoleNoneCheckSignupIc from "../../assets/icon/RoleNoneCheckSignupIc.svg";
import { newSocialUser } from "../../atom/signup/signup";
import { ROLE_SUB_TEXT } from "../../core/signup/signUpTextLabels";

interface RoleBlockProps {
  type: "선생님" | "학부모님";
  handleIsActive: () => void;
}

export default function RoleBlock(props: RoleBlockProps) {
  const { type, handleIsActive } = props;
  const setNewUser = useSetRecoilState(newSocialUser);

  function handleRadioClick(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setNewUser((prev) => ({ ...prev, role: target.value }));
    handleIsActive();
  }

  return (
    <RoleRapper>
      <RadioButton
        type="radio"
        name="role"
        value={type}
        id={type}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRadioClick(e)}
        $RoleNoneCheckSignupIc={RoleNoneCheckSignupIc}
        $RoleCheckSignupIc={RoleCheckSignupIc}
      />
      <TextWrapper>
        <RadioNameWrapper>
          <RadioBoldName htmlFor={type}>{type}</RadioBoldName>
          <RadioPlainName htmlFor={type}>
            {ROLE_SUB_TEXT.signupBy}
          </RadioPlainName>
        </RadioNameWrapper>
        <RadioSubName htmlFor={type}>
          {" "}
          {type === "선생님"
            ? ROLE_SUB_TEXT.teacherText
            : ROLE_SUB_TEXT.parentsText}
        </RadioSubName>
      </TextWrapper>
    </RoleRapper>
  );
}

const RoleRapper = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 3.6rem;
  margin-left: 0.9em;
`;

const RadioButton = styled.input<{
  $RoleNoneCheckSignupIc: string;
  $RoleCheckSignupIc: string;
}>`
  background-image: url(${(props) => props.$RoleNoneCheckSignupIc});
  background-size: cover;

  width: 4rem;
  height: 4rem;
  flex-shrink: 0;

  margin-right: 2rem;

  &:checked {
    background-image: url(${(props) => props.$RoleCheckSignupIc});
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RadioNameWrapper = styled.div`
  display: flex;
  flex-direction: row;

  color: ${({ theme }) => theme.colors.grey900};
`;

const RadioBoldName = styled.label`
  ${({ theme }) => theme.fonts.title02};
`;

const RadioPlainName = styled.label`
  ${({ theme }) => theme.fonts.title03};
`;

const RadioSubName = styled.label`
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body07};
`;
