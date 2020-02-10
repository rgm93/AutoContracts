import axios from 'axios';

export const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

export const verifyLength = (value, length) => value.length > length
export const verifyNumber = value => new RegExp("^[0-9]+$").test(value)
export const verifyDocNumber = (value, type) => {
    console.log('value', value)
    console.log('valueLength', value.length)
    console.log('type', type)
    let length = 0
    switch(type){
      case 'NIF': length = 9; break;
      case 'PAS': length = 12; break;
      default: break;
    }
    return value.length === length
}

export const verifyCodeChange = vals => {
    if (vals.length >= 6) {
      console.log('complete, ', vals);
    } else if (vals.length === 0) {
      console.log('empty, ', vals);
    }
};

export const getEntities = () => {
  /*
    axios.get('http://172.20.10.3:8000/api/v1/entities/", {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
    }).then((response) => {
        console.log('estado', response.data.status)
        if(response.data.status === "COM" && response.data.is_face_detected === true) {
            return response.data
        }
    }).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error)
        return error
    })

  */
  const entities = [
    {
      name: "GAP"
    },
    {
      name: "Cuatrecasas"
    },
    {
      name: "GoldmanSachs"
    },
    {
      name: "JP Morgan"
    },
    {
      name: "City Bank"
    }
  ]
  return entities
}

export const formSignIn = (state) => {
    let result = false
    const body = JSON.stringify({
      "email": state.email,
      "password": state.password,
      "name": state.name,
      "surname": state.surname,
      "phone": state.phone,
      "address": state.address,
      "company": state.company,
      "job": state.job,
      "is_signatory": state.role,
      "doc_number": state.doc_number
    })
    axios.post('http://172.20.10.3:8000/api/v1/users/create/', body, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      console.log('rrrrr', response.data)
      localStorage.setItem("authtoken", response.data.token)
      result = true
      
    }).catch((error) => {
      console.log('response', error.response.data['error'])
      alert(error.response.data['error'])
    }).finally(() => {
        return result;
    });
}

export const sendDocumentPhoto = (dataUri) => {
    let body = JSON.stringify({
        "doc_frontal": dataUri,
        "type": 'IDD'
      });
      axios.post('http://172.20.10.3:8000/api/v1/identity/document/', body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
      })
      .then((response) => {
        return response.data
      }).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error)
      })
}

export const scannnerFaceDocument = (id) => {
    axios.get('http://172.20.10.3:8000/api/v1/identity/document/' + id + "/", {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
    }).then((response) => {
        console.log('estado', response.data.status)
        if(response.data.status === "COM" && response.data.is_face_detected === true) {
            return response.data
        }
    }).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error)
        return error
    })
}

export const scannerBackDocument = (id, dataUri) => {
    let body = JSON.stringify({
        "doc_backside": dataUri,
        "type": 'IDD'
    });
    axios.patch('http://172.20.10.3:8000/api/v1/identity/document/' + id + "/", body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
    })
    .then((response) => {
        setTimeout(() => {
            console.log('responseSecond', response.data)
            return response.data
        }, 3000);
    }).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error)
        return error
    })
}

export const generateValidationCode = () => {
    axios.post('http://172.20.10.3:8000/api/v1/users/validation_code/', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
    })
    .then((response) => {
        localStorage.setItem("emailValidationCode", response.data.validation_code)
        return response
    }).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error)
        return error
    })
}

  