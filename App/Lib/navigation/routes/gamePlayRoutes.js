import {
  SongSelection,
  RoundWinnerSelection,
  RoundTieBreaker,
  RoundWinner,
  GameWinner,
  RoundWinnerRandomizer
} from '../../screens/GamePlay/Player';
import { gamePlay } from '../../constants/screens';

const routes = {
  [gamePlay.playerSongSelection]: SongSelection,
  [gamePlay.roundWinnerSelection]: RoundWinnerSelection,
  [gamePlay.roundTieBreaker]: RoundTieBreaker,
  [gamePlay.roundWinner]: RoundWinner,
  [gamePlay.gameWinner]: GameWinner,
  [gamePlay.roundWinnerRandomizer]: RoundWinnerRandomizer
};

export default routes;
