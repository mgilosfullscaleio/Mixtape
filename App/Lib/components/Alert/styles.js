import { ScaledSheet } from '../../utils';
import colors from '../../styles/colors';

const styles = ScaledSheet.create({
  container: {
    borderRadius: '10@s',
    backgroundColor: colors.black
  },

  contentContainer: {
    padding: '10@s'
  },

  closeButton: {
    alignSelf: 'flex-end',
    margin: '10@s',
    borderRadius: '3@s',
    width: '27@s',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: colors.maroon,
    justifyContent: 'center',
    alignItems: 'center'
  },

  optionsContainer: {
    flexDirection: 'row'
  },

  x: {
    width: '15@s',
    height: undefined,
    aspectRatio: 1
  }
});

export default styles;
