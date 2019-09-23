import { ScaledSheet } from '../../utils';

const styles = ScaledSheet.create({
  container: {
    padding: '20@s',
    justifyContent: 'space-between'
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  leftCard: {
    marginRight: '20@s'
  },

  breakingGamesLogo: {
    marginVertical: '5@s',
    width: '55%',
    height: undefined,
    aspectRatio: 2.41
  },

  rightCardContainer: {
    flex: 1
  },

  rightCardContent: {
    flex: 1,
    justifyContent: 'space-between'
  },

  gameCredits: {
    fontSize: '18@s',
    marginBottom: '10@s'
  }
});

export default styles;
