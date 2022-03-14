import React from "react";
import './login.css';

const Login = () => {

/*
    const signinBtn = document.querySelector('.signinBtn');
    const signupBtn = document.querySelector('.signupBtn');
    const formBx = document.querySelector('.formBx');
    const body = document.querySelector('body');

    signupBtn.onclick=function(){
      formBx.classList.add('active');
      body.classList.add('active');
    }

    signinBtn.onclick=function(){
      formBx.classList.remove('active');
      body.classList.remove('active');
    }
*/

    return (
        <>
            <div className="containerLogin">
                <div className="blueBg">
                    <div className="box signin">
                    <h2>¿Ya tienes una cuenta?</h2>
                    <button className="signinBtn">Ingresa</button>
                    </div>

                    <div className="box signup">
                    <h2>¿No tienes una cuenta?</h2>
                    <button className="signupBtn">Registrate</button>
                    </div> 
                </div>

                <div className="formBx">

                    <div className="form signinForm">
                        <form>
                            <h3>Login</h3>
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <input type="submit" placeholder="Login" />
                            <a href="#" className="forgot">Olvidaste la contaseña?</a>
                        </form>
                    </div>

                    <div className="form signupForm">
                        <form>
                            <h3>Regsitro</h3>
                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email Address" />
                            <input type="password" placeholder="Password" />
                            <input type="password" placeholder="Confirm Password" />
                            <input type="submit" placeholder="Register" />
                        </form>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Login;