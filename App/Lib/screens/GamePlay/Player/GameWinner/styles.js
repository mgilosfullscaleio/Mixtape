import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';

const styles = ScaledSheet.create({
  container: {},

  content: {
    flex: 1,
    justifyContent: 'center'
  },

  congratulations: {
    fontSize: '32@s',
    color: colors.white,
    textAlign: 'center'
  },

  winnerAvatar: {
    width: '100%',
    marginTop: '30@s',
    marginBottom: '60@s'
  },

  winnerAvatarName: {
    color: colors.orange,
    fontSize: '22@s',
    marginTop: '10@s'
  },

  button: {
    alignSelf: 'center',
    width: '70%'
  },

  playerQueueContainer: {
    // paddingVertical: '15@s',
    height: '90@s',
    justifyContent: 'center',
    backgroundColor: colors.black
  }
});

export default styles;
