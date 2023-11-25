import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'

export default function Search() {

    return (
        <Box
        component="form"
        sx={{'& > :not(style)': { m: 1, width: '16ch' },
        '& .MuiInputLabel-root': { fontWeight: 'bold' ,fontFamily: 'Roboto', fontSize: '16.5px', color: 'white' },
        '& .MuiInputBase-input': { fontSize: '14px', color: 'white' },
        }}
        noValidate
        >
            <TextField 
            id="filled-basic" 
            variant="filled"
            label="Search" 
            />
        </Box>
    )
}