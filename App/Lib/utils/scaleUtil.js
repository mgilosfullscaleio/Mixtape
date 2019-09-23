import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width > height ? width : height;

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 667;
const DESIGN_RESOLUTION = Math.sqrt(
  DESIGN_WIDTH * DESIGN_WIDTH + DESIGN_HEIGHT * DESIGN_HEIGHT
);

const CURRENT_RESOLUTION = Math.sqrt(
  SCREEN_WIDTH * SCREEN_WIDTH + SCREEN_HEIGHT * SCREEN_HEIGHT
);

const SCALE = CURRENT_RESOLUTION / DESIGN_RESOLUTION;

const widthPercentage = percent => (percent * SCREEN_WIDTH) / 100;
const heightPercentage = percent => (percent * SCREEN_HEIGHT) / 100;

export { widthPercentage, heightPercentage };
export default size => size * SCALE;
