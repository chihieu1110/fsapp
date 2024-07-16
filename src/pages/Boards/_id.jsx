import { Container } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis";

function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "668f6cce7eaf70f7cb4d315f";
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board);
    });
  }, []);
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "pallette.primary" }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
}

export default Board;
