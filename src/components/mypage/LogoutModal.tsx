import React from "react";
import styled from "styled-components";
import BasicDoubleModal from "../common/BasicDoubleModal";
import { useMutation } from "react-query";
import { patchLogout } from "../../api/patchLogout";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../api/cookie";
import { isLogin } from "../../utils/common/isLogined";

interface LogoutModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckingLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogoutModal(props: LogoutModalProps) {
  const { setOpenModal, setIsCheckingLogout } = props;
  const navigate = useNavigate();
  function handleBacktoMypage() {
    setOpenModal(false);
    setIsCheckingLogout(false);
  }

  const { mutate: patchingLogout } = useMutation(patchLogout, {
    onSuccess: (res) => {
      removeCookie("accessToken", {});
      if (!isLogin()) {
        navigate("/");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleLogout() {
    patchingLogout();
  }

  return (
    <>
      <BasicDoubleModal
        leftButtonName="취소"
        rightButtonName="확인"
        handleClickLeftButton={handleBacktoMypage}
        handleClickRightButton={handleLogout}>
        <AskingSureToLogout>로그아웃하시겠어요?</AskingSureToLogout>
      </BasicDoubleModal>
    </>
  );
}

const AskingSureToLogout = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;
