import { Home, Lobby } from '../../screens/Home';
import { SongSelection } from '../../screens/GamePlay/Player';
import { home } from '../../constants/screens';

const routes = {
  [home.root]: Home,
  [home.lobby]: Lobby,
  [home.playerSongSelection]: SongSelection
};

export default routes;
