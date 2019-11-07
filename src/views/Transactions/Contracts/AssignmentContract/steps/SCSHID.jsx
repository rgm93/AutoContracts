import React, { Component } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

import './SCSHID.css';

class LiveVideoSCSHID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  mediaHandler = () => {
    console.log(faceapi.nets);
    const hideo = document.getElementById("video");
    const displaySize = {
      width: hideo.width,
      height: hideo.height
    };
    const canvas = faceapi.createCanvas({
      width: hideo.width,
      height: hideo.height
    });
    document.getElementById("videoContainer").append(canvas);
    faceapi.matchDimensions(canvas, displaySize);

    // const box = { x: 50, y: 50, width: 100, height: 100 }
    // see DrawBoxOptions below
    // const drawOptions = {
    // label: 'Hello I am a box!',
    // lineWidth: 2
    // }

    // const canvas = faceapi.createCanvasFromMedia(hideo)
    console.log(canvas);
    console.log(displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(hideo, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true)
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();
      // console.log(detections)

      detections.map((face, index) =>
        console.log("Face #", index, "Guessed age:", face.age, "Guessed gender:", face.gender)
      );
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      //faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);
  };

  componentDidMount = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.tinyYolov2.loadFromUri("/models"),
      faceapi.nets.ageGenderNet.loadFromUri("/models")
    ]).then(
      this.setState({
        loaded: true
      })
    );
  };

  render() {
    const videoConstraints = {
      width: 512,
      height: 512,
      facingMode: "user"
    };

    console.log(this.state);
    return (
      <div id="videoContainer">
        {this.state.loaded ? (
          <div>
            <Webcam
              id="video"
              width={512}
              height={512}
              audio={false}
              videoConstraints={videoConstraints}
              onUserMedia={this.mediaHandler}
            ></Webcam>
          </div>
        ) : null}
      </div>
    );
  }
}

export default class SCSHID extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SCSHID">
        <LiveVideoSCSHID />
      </div>
    );
  }
}
