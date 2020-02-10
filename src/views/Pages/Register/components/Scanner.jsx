import React, { Component } from 'react';

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export class Scanner extends Component {
    onTakePhoto = (dataUri) => {
        // Do stuff with the dataUri photo...
        console.log('takePhoto', dataUri);
    }
    
    onTakePhotoAnimationDone = (dataUri) => {
        // Do stuff with the photo...
        console.log('takePhoto');
    }
     
    onCameraError = (error) => {
    console.error('onCameraError', error);
    }
    
    onCameraStart = (stream) => {
        console.log('onCameraStart');
    }
     
    onCameraStop = () => {
        console.log('onCameraStop');
    }
    render() {
        return(
            <div>  
                <Camera 
                onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                onTakePhotoAnimationDone = { (dataUri) => { this.onTakePhotoAnimationDone(dataUri) } }
                imageType = {IMAGE_TYPES.JPG}
                isSilentMode = {true}
                onCameraStart = { (stream) => { this.onCameraStart(stream); } }
                onCameraStop = { () => { this.onCameraStop(); } } />
            </div>
        )
    }
}