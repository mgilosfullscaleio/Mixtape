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
    fontSize: 28
  },

  bottomContainer: {
    paddingTop: '13@s',
    paddingBottom: '30@s'
  },

  congratulations: {
    fontSize: '28@s',
    color: colors.white,
    textAlign: 'center'
  },

  winnerAvatar: {
    width: '100%',
    marginVertical: '17@s',
    paddingHorizontal: '10@s'
  },

  winnerAvatarName: {
    color: colors.orange,
    fontSize: '22@s'
  },

  playerQueueContainer: {
    // paddingVertical: '15@s',
    height: '90@s',
    justifyContent: 'center',
    backgroundColor: colors.black
  }
});

export default styles;
