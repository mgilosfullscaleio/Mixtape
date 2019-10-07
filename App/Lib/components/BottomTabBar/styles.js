import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.black
  },

  tabButton: {
    flex: 1,
    padding: '10@s',
    paddingBottom: '5@s',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  label: {
    fontSize: '15@s',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'white'
  }
});

export default styles;
