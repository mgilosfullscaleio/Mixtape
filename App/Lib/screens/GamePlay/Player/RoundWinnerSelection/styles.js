import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.white
  },

  listContainer: {
    flex: 1
  },

  scenarioContainer: {
    paddingHorizontal: '27@s',
    paddingVertical: '15@s'
  },

  scenario: {
    fontSize: '28@s'
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
    paddingVertical: '15@s',
    backgroundColor: colors.black
  }
});

export default styles;
