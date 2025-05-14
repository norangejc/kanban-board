import { HiMiniPencilSquare } from "react-icons/hi2";
import PageTitle from "../ui/PageTitle";
import CreateBoardComponent from "../components/boards/CreateBoardComponent";
import Container from "../ui/Container";

const CreateBoardPage = () => {
  return (
    <Container>
      <PageTitle>
        <HiMiniPencilSquare />
        CREATE BOARD
      </PageTitle>
      <CreateBoardComponent />
    </Container>
  );
};

export default CreateBoardPage;
