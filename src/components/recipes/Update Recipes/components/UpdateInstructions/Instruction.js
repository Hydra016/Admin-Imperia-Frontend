import React, { useState } from 'react'
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField } from '@material-ui/core';

function Instruction({ ins, i }) {
    const [value, setValue] = useState(ins)
    const [showInput, setShowInput] = useState(false)
  
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
            borderBottom: "2px solid #f2f2f2",
        }}>
        <div
          style={{
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <span style={{ display: "block", fontWeight: 500 }}>
            {`Step ${i + 1}`}:{" "}
          </span>
          {
            showInput ? <TextField variant='outlined6'/> : <span>{ins}</span>
          }
          
        </div>
        <IconButton onClick={() => setShowInput(!showInput)}>
            <EditIcon />
        </IconButton>
        </div>
      );
}

export default Instruction