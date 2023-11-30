import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'

const NavStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    background: #262525;
    color: white;
    padding: 20px;
    font-family: Roboto;
` 

const TitleLogo = styled.div`
    display: flex;
    margin-left: 40px;
`

const BoxItems = styled.div`
    display: flex;
    align-items: center;
    margin-right: 100px;
`

const CenterItems = styled.div`
    display: flex;
    margin-right: 60px;
`

const LogoFlex = styled.div`
    display: flex;
`

const TheTitle = styled.p`
    font-family: 'Roboto';
    font-size: 25.5px;
    font-weight: bold;
`   

export default function Navbar({setSearchTerm}) {
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <NavStyle>
            <TitleLogo>
                <Link to='/preview' style={{cursor: 'pointer', textDecoration: 'none',  color: 'inherit'}}>
                    <LogoFlex>
                        <TheTitle>The Midnight Podcast</TheTitle>
                        <img style={{marginLeft: 25}} src="./images/logoipsum-245.svg" height="30"/>
                    </LogoFlex>
                </Link>
            </TitleLogo>
            <CenterItems>
            </CenterItems>
            <BoxItems>
            <Box
                component="form"
                sx={{'& > :not(style)': { m: 1, width: '16ch' },
                '& .MuiInputLabel-root': { fontWeight: 'bold' ,fontFamily: 'Roboto', fontSize: '16px', color: 'white' },
                '& .MuiInputBase-input': { fontSize: '14px', color: 'white' },
            }}
                noValidate
                >
                <TextField 
                id="filled-basic" 
                variant="filled"
                label="Search" 
                onChange={handleSearch}
                autoComplete="off"
                name={`search-${Math.random().toString(36).substring(7)}`}
                />
            </Box>
            <Link to="/favorites" style={{fontSize: 16, fontWeight: 'bold', textDecoration: 'none',  color: 'inherit', marginLeft: 30 ,cursor: 'pointer'}}>Favorites</Link>
                <Link  to='/' style={{fontSize: 16, fontWeight: 'bold', textDecoration: 'none',  color: 'inherit', marginLeft: 80 ,cursor: 'pointer'}}>Log Out</Link >
            </BoxItems>
        </NavStyle>
    )
}

Navbar.propTypes = {
    setSearchTerm: PropTypes.func.isRequired, 
}