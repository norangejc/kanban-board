import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  width: 90vw;
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;


function AppLayout() {
  return (
    <StyledAppLayout>
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
