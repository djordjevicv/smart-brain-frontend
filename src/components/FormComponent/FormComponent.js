import React, { Component } from 'react';

class FormComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formEmail: '',
            formPassword: '',
            formName: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ formEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ formPassword: event.target.value });
    }

    onNameChange = (event) => {
        this.setState({ formName: event.target.value });
    }

    goToHomePage = (user) => {
        this.props.loadUser(user)
        this.props.onRouteChange('home');
        const userJSON = JSON.stringify(user);
        localStorage.setItem('userJSON', userJSON);
    }

    onSubmit = (route) => {
        if (route === 'signin') { // SIGN IN
            fetch('http://localhost:3001/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.formEmail,
                    password: this.state.formPassword
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) this.goToHomePage(user);
                    else alert('Invalid form submission!');
                });
        }
        else { // REGISTER
            fetch('http://localhost:3001/register', { 
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.formEmail,
                    password: this.state.formPassword,
                    name: this.state.formName
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (typeof (user) === 'object') this.goToHomePage(user);
                    else alert('Invalid form submission!');
                })
        }
    }
    render() {
        const { onRouteChange, route } = this.props;
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
                                                onChange={this.onNameChange}
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
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            {
                                route !== 'signin' ?
                                    <input
                                        onClick={() => this.onSubmit(this.props.route)}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                        type="submit"
                                        value="Register"
                                    />
                                    :
                                    <>
                                        <input
                                            onClick={() => this.onSubmit(this.props.route)}
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
}

export default FormComponent;