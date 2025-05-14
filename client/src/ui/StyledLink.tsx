import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  width: fit-content;
  color: var(--ash-gray);
  font-size: 15px;
  &:hover {
    color: var(--asparagus);
    transition: ease-in-out 300ms;
  }
`;

export default StyledLink;
