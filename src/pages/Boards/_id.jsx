import { Box, CircularProgress, Container } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useEffect, useState } from "react";
import {
  fetchBoardDetailsAPI,
  newCreatedCardAPI,
  newCreatedColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  relocateCardToColumnAPI,
  deleteColumnDetailsAPI
} from "~/apis";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatter";
import { mapOrder } from "~/utils/sorts";
import { toast } from "react-toastify";

function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "66a08aeeffe4df794b255648";
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await newCreatedColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };
  const createNewCard = async (newCardData) => {
    const createdCard = await newCreatedCardAPI({
      ...newCardData,
      boardId: board._id,
    });
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    );
    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard];
        columnToUpdate.cardOrderIds = [createdCard._id];
      } else {
        columnToUpdate.cards.push(createdCard);
        columnToUpdate.cardOrderIds.push(createdCard._id);
      }
    }
    setBoard(newBoard);
  };
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // call API to update board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  const repositionCard = (dndOrderedCards, dndCardOrder, columnId) => {
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndCardOrder;
    }
    setBoard(newBoard);
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndCardOrder });
  };

  const relocateCardToColumn = (
    activeCardId,
    previousColumnId,
    destinationColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    let previousCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === previousColumnId
    )?.cardOrderIds;
    if (previousCardOrderIds[0].includes("placeholder-card"))
      previousCardOrderIds = [];

    relocateCardToColumnAPI({
      activeCardId,
      previousColumnId,
      previousCardOrderIds,
      destinationColumnId,
      followingCardOrderIds: dndOrderedColumns.find(
        (c) => c._id === destinationColumnId
      )?.cardOrderIds,
    });
  };
  const removeColumnDetails = (columnId) => {
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId);
    setBoard(newBoard);
    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        repositionCard={repositionCard}
        relocateCardToColumn={relocateCardToColumn}
        removeColumnDetails={removeColumnDetails}
      />
    </Container>
  );
}

export default Board;
