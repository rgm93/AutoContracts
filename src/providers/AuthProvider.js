const AuthProvider = {
    isAuthenticated: false,
    authenticate() {
        this.isAuthenticated = localStorage.getItem('accountExists') && localStorage.getItem('authtoken') !== '' && localStorage.getItem('accountActivate') === 'ACT' && localStorage.getItem('master') !== '' ? true : false;
    },
    logout() {
        this.isAuthenticated = false;
        localStorage.clear('authtoken')
        localStorage.clear('accountActivate')
        localStorage.clear('master')
    },
    getAuth() {
        //return this.isAuthenticated;
        return true
    }
  };

  export default AuthProvider;