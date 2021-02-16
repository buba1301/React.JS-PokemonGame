const routes = {
  getBoard: {
    method: 'GET',
    url: 'https://reactmarathon-api.netlify.app/api/board',
  },

  getPlayer2: {
    method: 'GET',
    url: 'https://reactmarathon-api.netlify.app/api/create-player',
  },
  postCard: {
    method: 'POST',
    url: 'https://reactmarathon-api.netlify.app/api/players-turn',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

export default routes;
