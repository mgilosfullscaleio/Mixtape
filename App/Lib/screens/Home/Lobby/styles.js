import { ScaledSheet } from '../../../utils';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '20@s'
  },

  mechanicsContainer: {
    flex: 1,
    marginTop: '42@s',
    paddingHorizontal: '20@s'
  },

  mechanicItem: {
    alignItems: 'flex-start',
    marginTop: '30@s'
  },

  mechanicItemIcon1: {
    width: '35@s',
    margin: '7.5@s'
  },

  mechanicItemIcon2: {
    width: '50@s'
  },

  crownedTapeImage: {
    width: '23@s',
    height: '23@s'
  },

  quitGameButton: {
    marginTop: '30@s',
    width: '85%',
    height: undefined,
    aspectRatio: 3.68,
    alignSelf: 'center'
  }
});

export default styles;
