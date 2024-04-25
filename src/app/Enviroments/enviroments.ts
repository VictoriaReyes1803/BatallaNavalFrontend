const baseURL= 'http://127.0.0.1:8000/api';

export const environment ={
  pusher: {
    key: `4fdb056eebd9c1344fac`,
    cluster: `us3`
  },
  loginURL : `${baseURL}/user/login`,
  registerURL : `${baseURL}/user/register`,
  logoutURL : `${baseURL}/user/logout`,
  authenticateURL : `${baseURL}/user/authenticatetoken`,

  queueGameURL: `${baseURL}/game/queue`,
  joinRandomGameURL: `${baseURL}/game/join/random`,
  endGameURL: `${baseURL}/game/end`,
  dequeueGameURL: `${baseURL}/game/dequeue`,
  cancelRandomQueueURL: `${baseURL}/game/cancel/random`,
  historyGames: `${baseURL}/game/history`,
  sendBoard: `${baseURL}/game/send/board`,
  notify: `${baseURL}/game/notify`,
  sseURL: `${baseURL}/game/start`,
  attackURL: `${baseURL}/game/attack`,
  attackSuccessURL: `${baseURL}/game/attack/success`,
  attackFailedURL: `${baseURL}/game/attack/failed`,

}
