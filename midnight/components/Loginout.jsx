import React from 'react'
import PropTypes from 'prop-types'
import { supabase } from './client'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

const TheWholeForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    margin-left: 40%;
`

const TheForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
` 

export default function Loginout({ setShowNavbar }) {
     let navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        email: '', password:''
    })

    React.useEffect(() => {
        setShowNavbar(false);
        return () => setShowNavbar(true);
      }, [setShowNavbar])

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                })
                navigate('/preview')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
        <TheWholeForm>
            <h1 style={{fontFamily: 'Roboto'}}>
                The Midnight Podcast
            </h1>
            <TheForm onSubmit={handleSubmit}>
                <input
                style={{width: 300, height: 50}}
                placeholder='Email'
                name='email'
                onChange={handleChange}
                />
                <input
                style={{width: 300, height: 50}}
                placeholder='Password'
                name='password'
                type='password'
                onChange={handleChange}
                />
                <button style={{cursor: 'pointer', fontFamily: 'Roboto', width: 307, height: 50}} type='submit'>
                    Submit
                </button>
            </TheForm>
            <p style={{fontWeight: 'bold', fontFamily: 'Roboto'}}>Do not have an account?</p><Link to='/signup' style={{fontWeight: 'bold', fontFamily: 'Roboto', textDecoration: 'none',  color: 'blue'}}>SignUp</Link> 
        </TheWholeForm>
        </div>
    )
}

Loginout.propTypes = {
    setShowNavbar: PropTypes.func.isRequired,
}