const APIKey = 'AIzaSyAW7bHJ-V-RjVvoHbEt55jLEC7hDPySjL0';

const apiRoutes = {
  signUp: {
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`,
  },
  signIn: {
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`,
  },
};

export default apiRoutes;
