import { GridLoader } from "react-spinners";

function Spinner({ size = 25, color = "--tea-green" }) {
  return <GridLoader size={size} color={`var(${color})`} />;
}

export default Spinner;
