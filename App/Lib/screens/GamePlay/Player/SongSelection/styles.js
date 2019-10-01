import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.white
  },

  topContainer: {
    flex: 1
  },

  topContentContainer: {
    paddingHorizontal: '27@s',
    paddingVertical: '15@s'
  },

  scenario: {
    fontSize: '28@s'
  },

  bottomContainer: {
    flex: 1
  },

  songBar: {
    backgroundColor: colors.gray
  },

  playerQueueContainer: {
    marginTop: '57@s', // should be the same as SongSearchBar's headerContainer.height
    paddingVertical: '15@s',
    backgroundColor: colors.black
  },

  noTopMargin: {
    marginTop: 0
  }
});

export default styles;
