import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.white
  },

  alertMessage: {
    color: colors.white,
    textAlign: 'center',
    fontSize: '30@s'
  },

  topContainer: {
    flex: 1
  },

  topContentContainer: {
    paddingHorizontal: '27@s',
    paddingVertical: '15@s'
  },

  scenario: {
    fontSize: 28
  },

  bottomContainer: {
    flex: 1
  },

  songBar: {
    backgroundColor: colors.gray
  },

  playerQueueContainer: {
    marginTop: '57@s', // should be the same as SongSearchBar's headerContainer.height
    // paddingVertical: '15@s',
    height: '98@s',
    backgroundColor: colors.black,
    justifyContent: 'center'
  },

  noTopMargin: {
    marginTop: 0
  }
});

export default styles;
