import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";


const CardComponent = ({card, index}) => {
  const myClass = useStyle();
  return (
    <Draggable draggableId={card.id} index={index}>
      {
        (provided) => (
          <div ref={provided.innerRef} {...provided.dragHandleProps} 
          {...provided.draggableProps}>
            <Paper className={myClass.trellocard}>
              {card.title}
            </Paper>
          </div>
        )
      }
    </Draggable>
  )
}

const useStyle = makeStyles(theme => ({
  trellocard: {
      padding: "0.6em",
      paddingLeft: "1em",
      margin: "0.8em",
  }
}));

export default CardComponent