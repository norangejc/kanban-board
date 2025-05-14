import Board from "../components/boards/Board";
import SearchBoard from "../components/boards/SearchBoard";
import Container from "../ui/Container";
import PageTitle from "../ui/PageTitle";
import { BiSolidDashboard } from "react-icons/bi";

function BoardPage() {
  return (
    <Container>
      <PageTitle>
        <BiSolidDashboard />
        BOARD
      </PageTitle>
      <SearchBoard />
      <Board />
    </Container>
  );
}

export default BoardPage;
