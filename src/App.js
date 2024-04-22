import './App.css';
import ListTrello from './components/ListTrello.js';
import { makeStyles } from "@mui/styles";
import BackgroundImg from './img/Test_bk.jpg';
import AddCardOrList from './components/AddCardOrList.js';
import mockData from './mockdata.js';
import { useState } from 'react';
import ContextAPI from './ContextAPI.js';
import uuid from 'react-uuid';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

function App() {
  const myClass = useStyle();
  const [data, setData] = useState(mockData);

  const updateListTitle = (updatedTitle, listID) => {
    const listToUpdate = data.lists[listID];
    listToUpdate.title = updatedTitle;
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listID] : listToUpdate
      }
    });
  }

  const AddCard = (newTitle, listID) => {

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title: newTitle
    }

    const listToUpdate = data.lists[listID];
    listToUpdate.cards = [...listToUpdate.cards, newCard]

    setData({
      ...data,
      lists: {
        ...data.lists,
        [listID]: listToUpdate 
      }
    });

  }

  //Mirar diseño y todo en general
  const AddList = (newTitle) => {

    const newListId = uuid();

    setData({
      ...data,
      lists: {
        ...data.lists,
        [newListId]:{
          id: newListId,
          title: newTitle,
          cards: []
        }
      },
      listIds: [
        ...data.listIds,
        newListId
      ]
    });

  }

  const onDragEnd = (result) => {

    console.log(result);
    const {destination, source, draggableId, type} = result;

    if (!destination) {

      return;

    }

    if (type === "list") {

      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;

    }

    if (type === "card") {

      const sourceList = data.lists[source.droppableId];
      const destinationList = data.lists[destination.droppableId];

      const draggingCard = sourceList.cards.filter((card)=>card.id === draggableId)[0];

      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      if (source.droppableId === destination.droppableId) {

        setData ({
          ...data,
          lists: {
            ...data.lists,
            [sourceList.id]: destinationList,
          }
        });

      } else {

        setData ({
          ...data,
          lists: {
            ...data.lists,
            [sourceList.id]: sourceList,
            [destinationList.id]: destinationList,
          }
        });

      }

    }


  }

  return (
    <ContextAPI.Provider value={{updateListTitle, AddList, AddCard}}>
      <div className={myClass.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableTrelloBoard" type="list" direction="horizontal">
            {
              (provided) => (
                <>
                  <div className={myClass.myFlex} 
                        ref={provided.innerRef}
                        {...provided.droppableProps}> 
                    {
                      data.listIds.map((listID, index) => {
                        const list = data.lists[listID];
                        return <ListTrello list={list} index={index} key={listID}/>
                      })
                    }
                    <div>
                      <AddCardOrList type="list"/>
                      {provided.placeholder}
                    </div>
                  </div>
                </>
              )
            }
          </Droppable>
        </DragDropContext>
      </div>
    </ContextAPI.Provider>
  );
}

const useStyle = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  myFlex: {
    display: "flex",
    overflowY: "auto"
  }
}));

export default App;
