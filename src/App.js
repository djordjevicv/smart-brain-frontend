import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import PictureScanner from './components/PictureScanner/PictureScanner';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FormComponent from './components/FormComponent/FormComponent';
import './App.css';
import LeaderBoard from './components/Leaderboard/Leaderboard';
import homeContext from './utilities/homeContext';

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  isModalOpen: false,
}
class App extends Component {


  constructor() {
    super();
    this.state = initialState;
  }


  componentDidMount() {
    this.setState(initialState);

    if (localStorage.getItem('userJSON') === null)
      localStorage.setItem('userJSON', '');

    if (localStorage.getItem('userJSON') !== '') {
      const currentUser = JSON.parse(localStorage.getItem('userJSON'));
      this.setState({ user: currentUser });
      this.onRouteChange('home');
    }
  }


  updateUserCount = (count) => {
    this.setState(Object.assign(this.state.user, { entries: count }));
    return this.state.user;
  }


  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }


  changeOpen = () => {
    return !this.state.isModalOpen ? this.setState({ isModalOpen: true })
      : this.setState({ isModalOpen: false });
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  render() {
    const { isSignedIn, route, user, isModalOpen } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" color="#ffffff" num={100} bg={true} />
        <Navigation isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          changeOpen={this.changeOpen} />
        {route === 'home'
          ?
          <div>
            <homeContext.Provider value={{ user, changeOpen: this.changeOpen, isModalOpen, updateUserCount: this.updateUserCount }}>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <LeaderBoard changeOpen={this.changeOpen}
                isModalOpen={this.state.isModalOpen}
              />
              <PictureScanner />
            </homeContext.Provider>
          </div>
          :
          <FormComponent loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            route={this.state.route} />
        }
      </div>
    );
  }
}

export default App;
