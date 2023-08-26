import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FormComponent from './components/FormComponent/FormComponent';
import './App.css';
import LeaderBoard from './components/Leaderboard/Leaderboard';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
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
  topFive: [
    {
      name: '',
      entries: ''
    },
    {
      name: '',
      entries: ''
    },
    {
      name: '',
      entries: ''
    },
    {
      name: '',
      entries: ''
    },
    {
      name: '',
      entries: ''
    },

  ]
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


  populateTopFive = (arrayOfData) => {
    this.setState({ topFive: arrayOfData });
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }


  displayFaceBox = (box) => {
    this.setState({ box: box });
    
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  changeOpen = () => {
    if (this.state.isModalOpen === false)
      this.setState({ isModalOpen: true });
    else 
      this.setState({ isModalOpen: false });
  }


  refreshHome = () => {
    location.reload();
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('https://smartbrain-backend-jbvx.onrender.com/imageURL', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://smartbrain-backend-jbvx.onrender.com/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }));
                const userJSON = JSON.stringify(this.state.user);
                localStorage.setItem('userJSON', userJSON);

              })
              .catch(console.log)
            this.displayFaceBox(this.calculateFaceLocation(response));
          }
        })
      .catch(console.log);
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" color="#ffffff" num={100} bg={true} />
        <Navigation isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          changeOpen={this.changeOpen} />
        { route === 'home'
          ?
            <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <LeaderBoard changeOpen={this.changeOpen}
                isModalOpen={this.state.isModalOpen}
                populateTopFive={this.populateTopFive}
                topFive={this.state.topFive } />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box}
                imageUrl={imageUrl} />
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
