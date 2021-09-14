import React, { useRef,useState } from 'react'
import { auth } from '../firebase';
import './Signin.css'
const Signin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const conPasswordRef = useRef(null);
    const [error,setError] = useState(null) 
    const [enable,setEnable] = useState(true)

    const [sign,setsign] = useState(false);


    const signUp = e => {
        e.preventDefault();
        setEnable(!enable);
        if (passwordRef.current.value !=  conPasswordRef.current.value) {
            setError("Passwords do not match");
            setEnable(!enable)
            return
        }
        setError(null);

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            setsign(!sign)
            console.log(user)
        }).catch(err => {
            setError(err.message)
            console.log(err)
        })
        setEnable(!enable)
    }
    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            console.log(user)
        }).catch(err => {
            setError(err.message)
            console.log(err)
        })
    }

    const SignUpForm = () => {
        return(
           
                <form action="">
                    <h1>Sign Up</h1>
                    <hr className="w-50 bg-white" />
                    {error ? <div className="alert">{error} </div>: null}

                    <div class="form-group">
                        <input classname="form-control" ref={emailRef} type="email" placeholder="Email" />                      
                    </div>
                    <div class="form-group">
                      <input ref={passwordRef} type="password" placeholder="Password" />                      
                    </div>
                    <div class="form-group">
                      <input ref={conPasswordRef} type="password" placeholder="Password" />                      
                    </div>

                    <button className="btn btn-info" onClick={signUp}>Sign Up  </button>
                
                </form>
            

        )
    }


    const SignInForm = () => {
        return(
            
                <form action="">
                    <h1>Sign in</h1>
                    <hr className="w-50 bg-white" />
                    {error ? <div className="alert">{error} </div>: null}
                    <div class="form-group">
                        <input classname="form-control" ref={emailRef} type="email" placeholder="Email" />                      
                    </div>
                    <div class="form-group">
                      <input ref={passwordRef} type="password" placeholder="Password" />                      
                    </div>
                        
                    <button className="btn btn-info" onClick={signIn}>Sign in </button>
                    
                </form>
          

        )
    }
    const handleSwitch = () => {
        setError(null);
        setsign(!sign);

    }
    return (
        <div className="card bg-dark m-4 p-4 text-white">

           {
               sign ? SignUpForm() : SignInForm()

           }
            Already Have A Account ?<a className="text-info" onClick={() => handleSwitch()} >{sign ? "Sign In" : "Sign Up"}</a>
        </div>
    )
}

export default Signin
