import { makeStyles } from "@mui/styles";
import { Collapse, Paper, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import InputCardOrList from "./InputCardOrList";

const AddCardOrList = ({type, listId}) => {

  const [open, setOpen] = useState(false);
  const myClass = useStyle();

  return (
    <div className={myClass.root}>
      <Collapse in={open}>
        <InputCardOrList type={type} setOpen={setOpen} id={listId}/>
      </Collapse>
      <Collapse in={!open}>
        <Paper className={type==="card"?(myClass.card):(myClass.list)} onClick={() => setOpen(true)}>
          <Typography className={myClass.centerVertical}>
            <AddIcon fontSize="small"/>{type==="card"?
            "Add a card":"Add another list"}
          </Typography>
        </Paper>
      </Collapse>
    </div>
  )
}

const useStyle = makeStyles(theme => ({
  root : {
    marginTop: "0em",
  },
  card: {
    padding: "0.4em",
    marginTop: "0.1em",
    margin: "0.8em",
    backgroundColor: "#eff0f4 !important",
    "&:hover": {
      transition: "0.2s",
      backgroundColor: "#DADBDE !important",
      cursor: "pointer",
      opacity: "0.9"
    }
  },
  list: {
    padding: "0.4em",
    marginTop: "1em",
    margin: "0.8em",
    backgroundColor: "#ebecf0 !important",
    "&:hover": {
      transition: "0.2s",
      backgroundColor: "#C9CACD !important",
      cursor: "pointer",
    }
  },
  centerVertical: {
    display: "flex",
    alignItems: "center"
  }
}));

export default AddCardOrList