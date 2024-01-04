import React, { useState } from 'react';


function FormComponent({ onRouteChange, route, loadUser}) {
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formName, setFormName] = useState('');

    const onEmailChange = (event) => {
        setFormEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
       setFormPassword(event.target.value);
    }

    const onNameChange = (event) => {
        setFormName(event.target.value);
    }

    const goToHomePage = (user) => {
        loadUser(user)
        onRouteChange('home');
        const userJSON = JSON.stringify(user);
        localStorage.setItem('userJSON', userJSON);
    }

    const onSubmit = (route) => {
        if (route === 'signin') { // SIGN IN
            fetch('http://localhost:3001/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formEmail,
                    password: formPassword
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id)
                        goToHomePage(user);
                    else
                        alert('Invalid form submission!');
                });
        }
        else { // REGISTER
            fetch('http://localhost:3001/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formEmail,
                    password: formPassword,
                    name: formName
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (typeof (user) === 'object') goToHomePage(user);
                    else alert('Invalid form submission!');
                })
        }
    }
        return (
            <article className="br3 ba b--black-10 mv4 mw6 shadow-5 center"
                style={{
                    width: "300px"
                }}>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            {
                                route !== 'signin' ?
                                    <>
                                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                                        <div className="mt3">
                                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                            <input
                                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={onNameChange}
                                            />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                    </>
                            }
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            {
                                route !== 'signin' ?
                                    <input
                                        onClick={() => onSubmit(route)}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                        type="submit"
                                        value="Register"
                                    />
                                    :
                                    <>
                                        <input
                                            onClick={() => onSubmit(route)}
                                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            value="Sign In"
                                        />
                                        <div className="lh-copy mt3">
                                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </main>
            </article>
        );
}

export default FormComponent;