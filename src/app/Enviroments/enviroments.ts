const baseURL= 'http://127.0.0.1:8000/api/';

export const environment ={
  pusher: {
    key: `4fdb056eebd9c1344fac`,
    cluster: `us3`
  },
  loginURL : `${baseURL}user/login`,
  registerURL : `${baseURL}user/register`,
  logoutURL : `${baseURL}user/logout`,
  authenticateURL : `${baseURL}user/authenticatetoken`,
  
}
