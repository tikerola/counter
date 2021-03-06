import React, { useState } from 'react'
import { Container, Header, FieldContainer, Form, Input, Error } from './login.styles'
import { auth } from '../../firebase/firebase'

import { Button } from '@tkerola/button'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    

    const removeError = () => setTimeout(() => setError(''), 2000)

    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            await auth.signInWithEmailAndPassword(email, password)
            
        } catch (error) {
            setError('Something went wrong!')
            removeError()
        }

    }

    

    return (
        <Container>
            <Header>Sign in with email and password</Header>
            <Form onSubmit={handleSubmit}>
                <FieldContainer>
                    <label>Email: </label>
                    <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FieldContainer>
                <FieldContainer>
                    <label>Password: </label>
                    <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FieldContainer>
                <FieldContainer>
                <Button font="'Cinzel', serif" style={{marginTop: '20px'}}>Submit</Button>
                    
                </FieldContainer>
                <FieldContainer>
                <Error>{ error && <p>{error}</p>}</Error>
                </FieldContainer> 
            </Form>
        </Container>
    )
}

export default LoginForm