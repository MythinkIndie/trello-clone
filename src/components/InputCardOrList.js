import { Button, IconButton, InputBase, Paper } from '@mui/material'
import { makeStyles } from "@mui/styles";
import React, { useState, useContext } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import ContextAPI from '../ContextAPI';

const InputCardOrList = ({type, setOpen, id}) => {
    const [title, setTitle] = useState("");
    const myClass = useStyle();
    const {AddCard, AddList} = useContext(ContextAPI);

    const handleAddItemToTrello = () => {

        if (title !== "") {

            if (type === "card") {

                AddCard(title, id);
    
            } else {
    
                AddList(title);
    
            }

            setTitle("");

        }
        
        setOpen(false);

    }

//Focus para la Card 
//Cambiar como se ve insert title

  return (
    <>
        <Paper className={myClass.card}>
            <InputBase className={myClass.input} 
            placeholder={type === "card"?"Enter a title for this card...":"Enter list title..."} value={title} 
            onBlur={()=>setOpen(false)}
            onChange={e=>setTitle(e.target.value)}
            inputProps={{className: myClass.input}}
            multiline/>
        </Paper>
        <div className={myClass.confirm}>
            <div className={myClass.myFlex}>
            <Button className={myClass.btnConfirm} onClick={handleAddItemToTrello}>Add {type}</Button>
            <IconButton onClick={() => setOpen(false)}>
                <ClearIcon/>
            </IconButton>
            </div>
            <IconButton>
                <MoreHoriz/>
            </IconButton>
        </div>
    </>
  )
}

const useStyle = makeStyles(theme => ({
    card : {
        padding: "0.6em",
        paddingLeft: "1em",
        margin: "0.8em",
        marginTop: "0"
    },
    input: {
        padding: "0 !important",
        width: "200px"
    },
    confirm: {
        display: "flex",
        margin: "0.8em",
        marginTop: "0",
        
    },
    btnConfirm: {
        color: "white !important", //TODO
        backgroundColor: "#5aac44 !important",
        "&:hover": {
            transition: "0.2s",
            backgroundColor: "#64be4c !important",
            cursor: "pointer",
          }
    },
    myFlex: {
        flexGrow: 1
    }
  }));

export default InputCardOrList