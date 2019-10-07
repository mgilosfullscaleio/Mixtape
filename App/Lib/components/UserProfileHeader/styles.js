import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: '10@s',
    paddingBottom: '5@s',
    paddingHorizontal: '15@s',
    backgroundColor: colors.black,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },

  column: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  leftColumn: {
    marginRight: '10@s'
  },

  rightColumn: {
    flex: 0,
    justifyContent: 'flex-end'
  },

  row: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  avatar: {
    width: '50@s',
    height: undefined,
    aspectRatio: 1
  },

  name: {
    marginLeft: '5@s',
    fontSize: '18@s',
    color: colors.white
  },

  address: {
    marginLeft: '5@s',
    fontSize: '16@s',
    color: colors.white
  },

  icon1: {
    marginTop: '19@s',
    width: '50@s',
    height: undefined,
    aspectRatio: 1
  },

  icon2: {
    width: '50@s',
    height: undefined,
    aspectRatio: 1
  },

  tapes: {
    marginRight: '12@s'
  },

  tapesBadge1: {
    top: '22@s',
    right: '-10@s',
    backgroundColor: colors.spotifyGreen,
    width: '20@s'
  },

  tapesBadge2: {
    top: '-10@s',
    width: '20@s'
  }
});

export default styles;
