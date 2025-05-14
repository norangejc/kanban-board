import styled from "styled-components";

const Textarea = styled.textarea`
  height: 7rem;
  border: none;
  background-color: var(--cream);
  border-radius: var(--border-radius-m);
  padding: 0.8rem 1rem;
  font-size: 15px;
  color: var(--violet);
  resize: none;
  &::placeholder {
    color: var(--asparagus);
  }
`;

export default Textarea;
