import { FunctionComponent } from "react";
import { styled } from "styled-components";

interface SwiperLayoutProps {
  text: string[];
  img: FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export default function SwiperLayout({ text, img }: SwiperLayoutProps) {
  return (
    <FirstSwiperContainer>
      <FirstSwiperTitle>
        {text[0]}
        <br /> <span>{text[1]}</span>
      </FirstSwiperTitle>

      <MockUpImg as={img} />
    </FirstSwiperContainer>
  );
}
const FirstSwiperContainer = styled.div`
  flex-direction: column;
  position: relative;
  height: 100vh;
  align-items: center;
  display: flex;

  width: 100%;
`;

const MockUpImg = styled.div`
  position: absolute;
  bottom: 0;
`;

const FirstSwiperTitle = styled.h1`
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: center;

  /* TOTO 수정 필요 */
  color: #293a3a;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.6rem;
  > span {
    color: #293a3a;
    font-family: Pretendard;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.6rem;
  }
`;
