import styled, { css } from "styled-components";

type Variation = "primary" | "icon" | "delete";

interface ButtonProps {
  variation?: Variation;
  width?: string;
}

const variations = {
  primary: css`
    background-color: var(--violet);
    color: var(--tea-green);
    &:hover {
      box-shadow: 0px 0px 25px var(--green-shadow);
      background-color: var(--night);
      color: var(--ash-gray);
      transition: ease-in-out 300ms;
    }
    &:disabled {
      box-shadow: none;
      cursor: not-allowed;
    }
  `,
  icon: css`
    background: none;
    cursor: pointer;
    color: var(--violet);

    &:hover {
      color: var(--asparagus);
      transition: ease-in-out 300ms;
    }
    & svg {
      width: 20px;
      height: 20px;
    }
  `,
  delete: css`
    background-color: var(--night);
    color: var(--violet);

    &:hover {
      color: var(--red);
      transition: ease-in-out 300ms;
    }
  `,
};

const Button = styled.button<ButtonProps>`
  border: none;
  color: var(--black);
  border-radius: var(--border-radius-m);
  padding: 0.6rem;
  font-size: 15px;
  font-weight: bolder;
  width: ${(props) => props.width || "auto"};
  ${(props) => props.variation && variations[props.variation]}
`;

export default Button;
