import { 
  SongSelection, 
  RoundWinnerSelection, 
  RoundWinner 
} from '../../screens/GamePlay/Player';
import { gamePlay } from '../../constants/screens';

const routes = {
  [gamePlay.playerSongSelection]: SongSelection,
  [gamePlay.roundWinnerSelection]: RoundWinnerSelection,
  [gamePlay.roundWinner]: RoundWinner,
};

export default routes;