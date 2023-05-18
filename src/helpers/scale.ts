import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const activeWidth = height > width ? width : height;
const activeHeight = height > width ? height : width;

const widthBaseScale = activeWidth / 428;
const heightBaseScale = activeHeight / 926;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function scale(layoutWidth: number) {
  let size: number;
  if (Platform.OS === 'ios') {
    size = normalize(layoutWidth, 'width');
  } else if (Math.abs(activeHeight / activeWidth) < 1.5) {
    size = PixelRatio.roundToNearestPixel(layoutWidth);
  } else {
    size = normalize(layoutWidth, 'width');
  }

  return size;
}

export function scaleHeight(layoutHeight: number) {
  let size: number;
  size = scale(layoutHeight);
  return size;
}

//for font  pixel
export function scaleFont(size: number) {
  let fontSize = 0;
  fontSize = scale(size);
  return fontSize;
}
