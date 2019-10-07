import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  title: {
    marginTop: '6@s',
    marginBottom: '26@s',
    fontSize: '26@s',
    color: colors.orange,
    textTransform: 'uppercase'
  },

  list: {
    flexGrow: 0
  },

  listContentContainer: {
    paddingHorizontal: '20@s'
  },

  separator: {
    width: '20@s'
  }
});

export default styles;
