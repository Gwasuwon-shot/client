import { styled } from "styled-components";

interface NoclassBannerProp {
  bannerTitle: string;
}

export default function NoclassBanner(props: NoclassBannerProp) {
  const { bannerTitle } = props;

  return <NoclassBannerWrapper>{bannerTitle}</NoclassBannerWrapper>;
}

const NoclassBannerWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 29.2rem;
  height: 8rem;
  padding: 1.6rem 1rem 1.6rem 1.4rem;

  border: 1px solid ${({ theme }) => theme.colors.green2};

  border-radius: 0.8rem;

  color: ${({ theme }) => theme.colors.green5};
  ${({ theme }) => theme.fonts.body02};
`;
