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

  disabledSongBarContainer: {
    backgroundColor: colors.gray
  },

  submitButtonContainer: {
    paddingVertical: '10@s',
    alignItems: 'center'
  },

  submitButton: {
    width: '168@s',
    height: undefined,
    aspectRatio: 2.58
  },

  playerQueueContainer: {
    //paddingVertical: '15@s',
    height: '90@s',
    justifyContent: 'center',
    backgroundColor: colors.black
  },

  slotmachine: {
    width: '175@s',
    height: undefined,
    aspectRatio: 1.96,
    marginBottom: '10@s'
  }
});

export default styles;
