import { Login, SpotifyLogin } from '../../screens/Auth';
import { auth } from '../../constants/screens';

const routes = {
  [auth.login]: Login,
  [auth.spotifyLogin]: SpotifyLogin
};

export default routes;
