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

  playerQueueContainer: {
    marginTop: '57@s',
    paddingVertical: '15@s',
    paddingHorizontal: '20@s',
    backgroundColor: 'rgba(0,0,0,0.3)' // colors.black
  }
});

export default styles;
