import { Paper, CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ListTitle from "./ListTitle";
import CardComponent from "./CardComponent";
import AddCardOrList from "./AddCardOrList";
import { Draggable, Droppable } from "react-beautiful-dnd";

const ListTrello = ({list, index}) => {
  const myClass = useStyle();
  return (
    <Draggable draggableId={list.id} index={index}>
      {
        (provided) => (
          <div ref={provided.innerRef} {...provided.dragHandleProps} 
          {...provided.draggableProps}>
            <Paper className={myClass.root}>
              <CssBaseline/>
              <ListTitle listTitle={list.title} listId={list.id} key={list.id}/>
              <Droppable droppableId={list.id} type="card">
                {
                  (provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {
                          list.cards.map((card, index) => {
                            return <CardComponent card={card} index={index} key={card.id}/>
                          })
                        }
                        {provided.placeholder}
                      </div>
                  )
                }
              </Droppable>
              <AddCardOrList type="card" listId={list.id}/>
            </Paper>
          </div>
        )
      }
    </Draggable>
    
  )
}

const useStyle = makeStyles(theme => ({
    root: {
        width: "300px",
        backgroundColor: "#ebecf0 !important",
        margin: "1em",
        height: "min-content"
    }
}));

export default ListTrello