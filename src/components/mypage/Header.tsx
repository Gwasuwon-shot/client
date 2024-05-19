import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  
    function handleClick() {
    const newCount = clickCount + 1;
    setClickCount(newCount); 

    if (newCount === 3) {
      navigate('/alert')
      setClickCount(0); 
    }
  };
  
  return ( <HeaderText onClick={handleClick}>마이페이지</HeaderText>);
}

const HeaderText = styled.h1`
  margin-left: 1.4rem;
  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;
