import type { ReactNode } from "react";
import styled from "styled-components";

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 35px;
  font-weight: bold;
  color: var(--violet);
`;
type PageTitleProps = {
  children: ReactNode;
};

function PageTitle({ children }: PageTitleProps) {
  return <Title>{children}</Title>;
}

export default PageTitle;
