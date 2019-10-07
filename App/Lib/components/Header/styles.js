import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: '13@s',
    paddingBottom: '13@s',
    backgroundColor: colors.black,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    flex: 1,
    fontSize: '28@s',
    textAlign: 'center',
    color: colors.white
  }
});

export default styles;
