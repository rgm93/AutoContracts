import axios from 'axios';
import { rejects } from 'assert';
var base64 = require('base-64');
var utf8 = require('utf8');
var Mnemonic = require('bitcore-mnemonic');

export const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

export const verifyLength = (value, length) => value.length > length
export const verifyMnemonicWords = value => value.replace(/(^\s*)|(\s*$)/gi,"")
  .replace(/[ ]{2,}/gi," ")
  .replace(/\n /,"\n").split(' ').length == 12


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
      "doc_type": state.type_doc,
      "doc_number": state.doc_number
    })
    axios.post('http://134.209.21.92/api/v1/users/create/', body, {
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

export const formLogIn = (email, password) => {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const body = JSON.stringify({
        "email": email,
        "password": password
      })
      axios.post('http://134.209.21.92/api/v1/users/login/', body, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => resolve(response.data))
      .catch((error) => resolve(error.response.data.error))
    }, 2000)
  });
}

export const isAccountExists = email => {
  return new Promise(resolve => {
    setTimeout(() => {
      axios.get('http://134.209.21.92/api/v1/users/exists/?email=' + email)
      .then(response => resolve(response.data.user_exists))
      .catch(error => console.log('error', error.message))
    }, 2000)
  });
}

export const isAccountActivated = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      axios.get('http://134.209.21.92/api/v1/users/status_account/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
      })
      .then(response => resolve(response.data.activated))
      .catch(error => console.log('error', error.message))
    }, 2000)
  });
  
}

export const sendDocumentPhoto = (dataUri) => {
    let body = JSON.stringify({
        "doc_frontal": dataUri,
        "type": 'IDD'
      });
      axios.post('http://134.209.21.92/api/v1/identity/document/', body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        }
      })
      .then((response) => {
        return response.data.activated
      }).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error)
      })
}

export const scannnerFaceDocument = (id) => {
    axios.get('http://134.209.21.92/api/v1/identity/document/' + id + "/", {
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
    axios.patch('http://134.209.21.92/api/v1/identity/document/' + id + "/", body, {
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

export const activeAccount = token => {
  const body = JSON.stringify({
    "status_account": 'ACT'
  });
  axios.patch('http://172.20.10.3:8000/api/v1/users/active_acccount/', body, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('authtoken')
    }
  })
  .then((response) => {
    console.log(response.data)
    setTimeout(() => {
      return response.data
    }, 3000);
  }).catch((error) => {
    console.log('response', error.response.data['error'])
    alert(error.response.data['error'])
  })
}

export const generateValidationCode = () => {
    axios.post('http://134.209.21.92/api/v1/users/validation_code/', {}, {
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

export const setMnemonicHash = (hash) => {
  let body = JSON.stringify({
    "mnemonic_hash": hash
  });
  axios.post('http://134.209.21.92/api/v1/users/mnemonic_hash', body, {
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

/*export const checkMnemonicPhrase = async (phrase) => {
  
  //let xpriv = new Mnemonic(phrase).toHDPrivateKey().xprivkey.toString()
  const body = JSON.stringify({
      "mnemonic_hash": phrase //cambiar
  })
  return await axios.post('http://134.209.21.92/api/v1/users/check_hash/', body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      }
    })
    .then((response) => {
      console.log('cheki', response.data)
      return response.data.is_corrects
      // Redirigir a Dashboard
    })
    .catch((error) => console.log('error', error))
}*/
export const checkMnemonicPhrase = (phrase) => {
  try {
    let xpriv = new Mnemonic(phrase).toHDPrivateKey().xprivkey
    return new Promise(resolve => {
      setTimeout(() => {
        const body = JSON.stringify({
          "mnemonic_hash": xpriv //cambiar
        })
        axios.post('http://134.209.21.92/api/v1/users/check_hash/', body, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('authtoken')
          }
        })
        .then((response) => {
          console.log('cheki', response.data)
          resolve(response.data.is_corrects)
        })
        .catch((error) => {
          console.log('error', error)
          rejects(false)
        })
      }, 2000);
    });
  } catch (error) {
    console.log('mal')
    return false
  }
}

  