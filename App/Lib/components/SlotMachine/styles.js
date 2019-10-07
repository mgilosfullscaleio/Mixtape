import { ScaledSheet } from '../../utils';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  slotWrapper: {
    backgroundColor: '#ff6905'
  },
  slotInner: {
    // backgroundColor: '#4a4b4b',
  },
  text: {
    fontSize: 30,
    top: 20,
    fontWeight: 'bold',
    color: '#3c3f44',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10
  },
  innerBorder: {
    position: 'absolute',
    top: 1,
    right: 1,
    left: 1,
    bottom: 1,
    borderColor: '#ff6905',
    borderWidth: 1,
    zIndex: 1
  },
  outerBorder: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderColor: '#4a4b4b',
    borderWidth: 1,
    zIndex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: '#ffffff77'
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

export default styles;
