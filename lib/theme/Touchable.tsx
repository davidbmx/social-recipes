import { createBox } from '@shopify/restyle';
import { Theme } from './theme';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const Touchable = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

export default Touchable;
