import axios from 'axios';
//import * as faceapi from 'face-api.js';
var base64 = require('base-64');
var utf8 = require('utf8');
var Mnemonic = require('bitcore-mnemonic');

export const getPreviewContract = (id) => {
    axios.get('http://172.20.10.3:8000/api/v1/contracts/contract/' + id + "/", {
       headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
       }
    }).then((response) => {
       console.log('estado', response.data.status)
       if(response.data.status === "COM" && response.data.is_face_detected === true) {
          var encoded = 'Zm9vIMKpIGJhciDwnYyGIGJheg==';
          var bytes = base64.decode(encoded);
          var data = utf8.decode(bytes);
          console.log('decoded', data);
          this.setState({html: data})
          
       } else {
          console.log('errorDOC - estado', response.data.status)
       }
    }).catch((error) => {
       console.log(error.response.data.error)
       alert(error.response.data.error)
    })
    
    /*let body = JSON.stringify({
       "data": encodedData
     });
     axios.post('http://172.20.10.3:8000/api/v1/identity/document/', body, {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + localStorage.getItem('authtoken')
       }
     })
     .then((response) => {
       setTimeout(() => {
         
         
     }).catch((error) => {
       console.log(error.response.data.error)
       alert(error.response.data.error)
     })
    });*/
    alert('Enviado correctamente')
 }

 export const sendPreviewContract = (state, id, data) => {
    var utf8 = require('utf8');
    console.log('text', data)
    var bytes = utf8.encode(data);
    var encodedData = base64.encode(bytes);
    console.log('encoded', 'data:text/html;base64,' + encodedData)

    let body = JSON.stringify({
       "data": encodedData
    });

    if(state === 'create') {
       axios.post('http://172.20.10.3:8000/api/v1/identity/document/', body, {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
          }
       })
       .then((response) => {
             setTimeout(() => {
             // SPINNER LOADING
             }, 3000).catch((error) => {
                console.log(error.response.data.error)
                alert(error.response.data.error)
             })
       })
    } else if (state === 'edit') {
       axios.patch('http://172.20.10.3:8000/api/v1/contracts/contract/' + this.state.idContract + "/", body, {
          headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Token ' + localStorage.getItem('authtoken')
          }
       })
       .then((response) => {
          setTimeout(() => {
             console.log('responseSecond', response.data)
             this.setState({checkedScanner: true, docIdCounter: this.state.docIdCounter + 1})
          }, 3000);
       }).catch((error) => {
          console.log(error.response.data.error)
          alert(error.response.data.error)
       })
    }
    /*let body = JSON.stringify({
       "data": encodedData
     });
     axios.post('http://172.20.10.3:8000/api/v1/identity/document/', body, {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + localStorage.getItem('authtoken')
       }
     })
     .then((response) => {
       setTimeout(() => {
         
         
     }).catch((error) => {
       console.log(error.response.data.error)
       alert(error.response.data.error)
     })
    });*/
    alert('Enviado correctamente')
 }

 export const setMnemonicPhrase = () => {
   var code = new Mnemonic(Mnemonic.Words.SPANISH);
   var codeString = code.toString()
   //var xpriv = code.toHDPrivateKey()

   /*let mnemonic = '' 

   let body = JSON.stringify({
      "mnemonic": xpriv
   });

   axios.patch('http://172.20.10.3:8000/api/v1/identity/mnenonic/', body, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('authtoken')
      }
   })
   .then((response) => {
      console.log('response', response)
      mnemonic = codeString
         setTimeout(() => {
         // SPINNER LOADING
         }, 3000).catch((error) => {
            console.log(error.response.data.error)
            alert(error.response.data.error)
         })
   }).catch((error) => {
      console.log(error.response.data.error)
      alert(error.response.data.error)
   })
   return mnemonic*/
   return codeString;
 }

 export const verifyMnemonicPhrase = (id, value) => {
   let result = false;
   axios.get('http://172.20.10.3:8000/api/v1/identity/mnemonic/' + id + "/", {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + localStorage.getItem('authtoken')
      }
   }).then((response) => {
      console.log('estado', response.data.mnemonic)
      result = this.state.mnemonicEncrypted === new Mnemonic(this.state.mnemonicPhrase).toHDPrivateKey().xprivkey
   }).catch((error) => {
      console.log(error.response.data.error)
      alert(error.response.data.error)
   })
   return result
 }

 export const setSignature = (sign) => {
   let result = false
   let body = JSON.stringify({
      "sign": sign
   });

   axios.post('http://172.20.10.3:8000/api/v1/identity/mnenonic/', body, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('authtoken')
      }
   })
   .then((response) => {
      console.log('response', response)
      result = true
         setTimeout(() => {
         // SPINNER LOADING
         }, 3000).catch((error) => {
            console.log(error.response.data.error)
            alert(error.response.data.error)
         })
   }).catch((error) => {
      console.log(error.response.data.error)
      alert(error.response.data.error)
   })
   return result
 }

 /* Blockchain Configuration
const fs = require('fs');
const FormData = require('form-data');

const config = {
   bucketName: 'scsh-pdf',
   //dirName: 'pdf', optional
   region: 'eu-west-1',
   accessKeyId: 'AKIAU3MFK7JRWHJVDT4H',
   secretAccessKey: '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',
}

const pinataApiKey = "f96160442ac769baa972";
const pinataSecretApiKey = "2ddd72a7f8b78d6dcb43e3b350f115abd9a112a5bf62c7c948d2bb3f4614070a";

const testAuthentication = () => {
   const url = `https://api.pinata.cloud/data/testAuthentication`;
   return axios
       .get(url, {
            headers: {
               'pinata_api_key': pinataApiKey,
               'pinata_secret_api_key': pinataSecretApiKey
            }
       })
       .then(function (response) {
           //handle your response here
       })
       .catch(function (error) {
           //handle error here
       });
};

const pinFileToIPFS = (file, pinataApiKey, pinataSecretApiKey) => {
   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

   //we gather a local file for this example, but any valid readStream source will work here.
   let data = new FormData();
   data.append('file', fs.createReadStream('./contract.pdf'));

   //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
   //metadata is optional
   const metadata = JSON.stringify({
       name: 'contract',
       keyvalues: {
           exampleKey: 'contractKey'
       }
   });
   data.append('pinataMetadata', metadata);

   //pinataOptions are optional
   const pinataOptions = JSON.stringify({
       cidVersion: 0
   });
   data.append('pinataOptions', pinataOptions);

   return axios.post(url,
       data,
       {
           maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
           headers: {
               'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
               'pinata_api_key': pinataApiKey,
               'pinata_secret_api_key': pinataSecretApiKey
           }
       }
   ).then(function (response) {
       //handle response here
   }).catch(function (error) {
       //handle error here
   });
};

// PINATA - IPFS
// API KEY: f96160442ac769baa972
// API SECRET KEY: 2ddd72a7f8b78d6dcb43e3b350f115abd9a112a5bf62c7c948d2bb3f4614070a

*/

/*signContractBlockchain = () => {
      
      // BLOCKCHAIN

      pinFileToIPFS(pinataApiKey, pinataSecretApiKey);
      
      console.log('Guardando en AWS...');
      ReactS3.uploadFile(this.state.blob, config)
      .then((data) => {
         console.log(data.location)
      })
      .catch((err) => {
         alert(err)
      })

} 


   Faceapi.js
  /*mediaHandler = () => {
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
    /*const videoConstraints = {
      width: 512,
      height: 512,
      facingMode: "user"
    };

    console.log(this.state);
    return (
      <SignatureCanvas penColor='green'
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
      {/*<div id="videoContainer">
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
*/