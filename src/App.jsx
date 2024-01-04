import React, { useEffect, useState } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import FormComponent from './components/FormComponent/FormComponent';
import { Home } from './components/Home/Home';
import './App.css';
import initialState from './utilities/initialState';
import { useLocation, Routes, Route } from 'react-router-dom';

function App() {

    const location = useLocation();
    
    const [isSignedIn, setIsSignedIn] = useState(initialState.isSignedIn);
    const [user, setUser] = useState(initialState.user);
    const [isModalOpen, setIsModalOpen] = useState(initialState.isModalOpen);
    const [route, setRoute] = useState(initialState.route);
    
    useEffect(() => {
        if (localStorage.getItem('userJSON') === null)
            localStorage.setItem('userJSON', '');

        if (localStorage.getItem('userJSON') !== '') {
            const currentUser = JSON.parse(localStorage.getItem('userJSON'));
            setUser(currentUser);
            onRouteChange('home');
        }
    }, []);


    const updateUserCount = (count) => {
        setUser(Object.assign({}, user, { entries: count }))
        return user;
    }


    const loadUser = (data) => {
        setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        });
    }


    const changeOpen = () => !isModalOpen ? setIsModalOpen(true) : setIsModalOpen(false);


    const onRouteChange = (route) => {
        if (route === 'signout') {
            setIsModalOpen(initialState.isModalOpen);
            setIsSignedIn(initialState.isSignedIn);
            setUser(initialState.user);
            setRoute(initialState.route);
        }
        else if (route === 'home') {
            setIsSignedIn(true);
        }
        setRoute(route);
    }

        return (
            <div className="App">
                <ParticlesBg type="cobweb" color="#ffffff" num={100} bg={true} />
                <Navigation isSignedIn={isSignedIn}
                    onRouteChange={onRouteChange}
                    changeOpen={changeOpen} />
                {
                    route === 'home' ?
                        <Home user={user}
                            changeOpen={changeOpen}
                            isModalOpen={isModalOpen}
                            updateUserCount={updateUserCount}
                        /> :
                        <FormComponent loadUser={loadUser}
                            onRouteChange={onRouteChange}
                            route={route} 
                        />
                }
                
            </div>
        );
    
}

export default App;
