import React, {useState, useReducer, useContext, useEffect}from 'react';

import AuthContext from '../store/auth-context';

const emailReducer = (state, action) => {
    if(action.type === 'INPUTEMAIL') {
        return {email: action.payload, isEmailValid: action.payload.includes('@')}
    }

    if(action.type === 'BLUREMAIL') {
        return {email: state.email, isEmailValid: state.email.includes('@')}
    }

    return {email:'', isEmailValid: false} 
};

const passwordReducer = (state, action) => {
    if(action.type === 'INPUTPASSWORD') {
        return {password: action.payload, isPasswordValid: action.payload.length>6}
    }

    if(action.type === 'BLURPASSWORD') {
        return {password: state.password, isPasswordValid: state.password.length>6}
    }

    return {password:'', isPasswordValid: false} 
};


const Login = (props) => {

    const [isInputValid, setIsInputValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {email:'',isEmailValid:null});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {password:'',isPasswordValid:null});

    const auc = useContext(AuthContext);

    useEffect(()=>{
        let identity = setTimeout(()=>{
            if(emailState.isEmailValid && passwordState.isPasswordValid) {
                setIsInputValid(true);
            } else {
                setIsInputValid(false);
            }
        }, 500)

        return ()=>{
            clearTimeout(identity);
        }
    },[emailState.isEmailValid, passwordState.isPasswordValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({type:'INPUTEMAIL', payload: event.target.value});
    }

    const passwordChangeHandler = (event) => {
        dispatchPassword({type:'INPUTPASSWORD', payload: event.target.value});
    }

    const emailValidHandler = () => {
        dispatchEmail({type:'BLUREMAIL'});
    }

    const passwordValidHandler = () => {
        dispatchPassword({type:'BLURPASSWORD'});
    }

    const sumbitHandler = (event) => {
        event.preventDefault();
        if(isInputValid) {
            auc.login(emailState.email, passwordState.password);
        } else if(!isInputValid) {
            console.log('inputInvalid');
        }
    }

    return (
        <div>
            <form onSubmit={sumbitHandler}>
                <div>
                    <label>email</label>
                    <input 
                        type='text' 
                        value={emailState.email} 
                        onChange={emailChangeHandler}
                        onBlur={emailValidHandler}
                        isValid={emailState.isEmailValid}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input 
                        type='text' 
                        value={passwordState.password} 
                        onChange={passwordChangeHandler}
                        onBlur={passwordValidHandler}
                        isValid={passwordState.isPasswordValid}
                    />
                </div>  
                <button type='submit' disabled={!isInputValid}>ok</button>
            </form>    
        </div>
    )
}

export default Login;