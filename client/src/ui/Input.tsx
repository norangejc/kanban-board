import styled from "styled-components";

const Input = styled.input`
  border: none;
  background-color: var(--cream);
  border-radius: var(--border-radius-m);
  padding: 0.8rem 1rem;
  font-size: 15px;
  color: var(--violet);
  &::placeholder {
    color: var(--asparagus);
  }
`;

export default Input;
