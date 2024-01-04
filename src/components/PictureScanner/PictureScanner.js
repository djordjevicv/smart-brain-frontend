import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import homeContext from "../../utilities/homeContext";

const PictureScanner = () => {

    const user = useContext(homeContext).user;
    const updateUserCount = useContext(homeContext).updateUserCount;

    const imageReference = useRef(null);

    const [imageUrl, setImageUrl] = useState('');
    const [input, setInput] = useState('');
    const [box, setBox] = useState('');

    const calculateFaceLocation = (data) => {

        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = imageReference.current;
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const onButtonSubmit = () => {
        setImageUrl(input);
        fetch('http://localhost:3001/imageURL', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response === 'unable to communicate with API') {
                    setBox('');
                    setInput('');
                    setImageUrl('');
                }
                else if (typeof(response.outputs[0].data.regions[0].region_info.bounding_box) === 'object') {
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            const userJSON = JSON.stringify(updateUserCount(count));
                            localStorage.setItem('userJSON', userJSON);
                        })
                        .catch(console.log)
                    setBox(calculateFaceLocation(response));
                }
                else {
                    setImageUrl('');
                    setInput('');
                    setBox('');
                }
            })
            .catch(() => setBox(''));
    }

    return (
        <>
            <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box}
                imageUrl={imageUrl}
                imageReference={imageReference} />
        </>
    );
}

export default PictureScanner;