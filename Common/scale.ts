import {Dimensions, PixelRatio} from 'react-native';
const {width, height} = Dimensions.get('window');
const dimensions: number = width < height ? width : height;
const guidelineBaseWidth: number = 360;

const scale: (number) => number = (size) => {
  return PixelRatio.roundToNearestPixel(
    (dimensions / guidelineBaseWidth) * size,
  );
};

export default scale;
