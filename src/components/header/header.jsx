import React from 'react'
import { Container, Logout, SignUpContainer, Span } from './header.styles'
import { connect } from 'react-redux'
import { auth, saveCountToProfile } from '../../firebase/firebase'
import { removeUser } from '../../redux/user/actions'
import { withRouter } from 'react-router'

const Header = ({ user, counter, removeUser, history, location, setIsLoggedIn }) => {
    
    const signOut = async () => {
        await saveCountToProfile(user.id, counter.counter)
        auth.signOut()
        setIsLoggedIn(false)
        removeUser()
    }

    if (user) {
        return (
            <Container>
                Welcome: {user.displayName}
                <Logout onClick={signOut}>Logout</Logout>
            </Container>
        )
    } else if (location.pathname === '/') {
        return (
            <Container>
                Choose your sign in method
                <SignUpContainer>
                    <Span>New user?</Span>
                    <Logout onClick={() => history.push('/signUp')} >Sign up</Logout>
                </SignUpContainer>
            </Container>
        )
    } else {
        return (
            <Container>
                Fill in the fields to sign up
                <Logout onClick={() => history.push('/')}>Back</Logout>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    counter: state.counter
})

const mapDispatchToProps = dispatch => ({
    removeUser: () => dispatch(removeUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))