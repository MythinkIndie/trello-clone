import { InputBase, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useContext, useState } from "react";
import ContextAPI from "../ContextAPI.js";


//El titulo se puede quedar vacio, eso no lo queremos
const ListTitle = ({listTitle, listId}) => {

    const myClass = useStyle();
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(listTitle);
    const {updateListTitle} = useContext(ContextAPI);

    const handleBlur = () => {
        updateListTitle(newTitle, listId);
        setOpen(false);
    }

    return (
        <>
            {open ? 
                (<InputBase
                    value={newTitle} 
                    onChange={e=>setNewTitle(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                    fullWidth
                    inputProps={{className: myClass.inputStyle}}/>
                ) 
                : 
                (<div className={myClass.titleStyle}>
                    <Typography className={myClass.titleText} onClick={() => setOpen(true)}>
                        {listTitle}
                    </Typography>
                    <MoreHorizIcon />
                </div>)
            }
        </>
    )
}

const useStyle = makeStyles(theme => ({
    titleStyle: {
        display: "flex",
        margin: "1em !important",
        paddingLeft: "0.4em !important"
    },
    inputStyle: {
        display: "flex",
        fontSize: "1.2rem !important",
        fontWeight: "bold",
        margin: "0.7em !important",
        paddingLeft: "0.4em !important",
        "&:focus": {
            background: "white",
        }
    },
    titleText: {
        flexGrow: 1,
        fontSize: "1.2rem !important",
        fontWeight: "bold !important"
    }
}));

export default ListTitle