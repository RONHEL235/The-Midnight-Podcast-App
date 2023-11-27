import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Search from './Search'

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
    margin-left: 50px;
`

const BoxItems = styled.div`
    display: flex;
    align-items: center;
    margin-right: 100px;
`

const CenterItems = styled.div`
    display: flex;
    margin-right: 60px;
    textDecoration: 'none';  color: 'inherit'
`

export default function Navbar() {

    return (
        <NavStyle>
            <TitleLogo>
                <h1 style={{cursor: 'pointer'}}>The Midnight Podcast</h1>
                <img style={{marginLeft: 25}} src="./images/logoipsum-245.svg" height="35"/>
            </TitleLogo>
            <CenterItems>
                <Link to="/discover" style={{fontSize: 18, fontWeight: 'bold', textDecoration: 'none',  color: 'inherit', marginLeft: 30 ,cursor: 'pointer'}}>Discover</Link>
                <Link to="/favorites" style={{fontSize: 18, fontWeight: 'bold', textDecoration: 'none',  color: 'inherit', marginLeft: 30 ,cursor: 'pointer'}}>Favorites</Link>
            </CenterItems>
            <BoxItems>
                <Search />
                <h3 style={{fontSize: '16.5px', marginLeft: 10,cursor: 'pointer'}}>Log Out</h3>
            </BoxItems>
        </NavStyle>
    )
}