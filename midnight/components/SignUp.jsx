import React from 'react'
import PropTypes from 'prop-types'
import { supabase } from './client'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BackgroundContainer = styled.div`
  background-image: url('./images/LoginBackground.jpg');
  background-size: cover;
  background-position: center;
  height: 80vh;
   width: 100%;
  color: white;
`;

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

export default function SignUp({ setShowNavbar }) {
    const [formData, setFormData] = React.useState({
        fullName: '', email: '', password:''
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
            const { data, error } = await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        }
                    }
                }
            )
            alert('Check your email for verification link')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <BackgroundContainer>
        <TheWholeForm>
            <h1 style={{fontFamily: 'Roboto'}}>
                The Midnight Podcast
            </h1>
            <TheForm onSubmit={handleSubmit}>
                <input
                style={{width: 300, height: 50}}
                placeholder='Fullname'
                name='fullName'
                onChange={handleChange}
                />
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
                <button style={{ cursor: 'pointer', width: 307, height: 50}} type='submit'>
                    Submit
                </button>
            </TheForm>
            <p style={{ fontWeight: 'bold', fontFamily: 'Roboto'}}>Already have an account?</p><Link to='/' style={{fontWeight: 'bold', fontFamily: 'Roboto', textDecoration: 'none',  color: 'blue'}}>Login</Link> 
        </TheWholeForm>
        </BackgroundContainer>
    )
}

SignUp.propTypes = {
    setShowNavbar: PropTypes.func.isRequired,
}