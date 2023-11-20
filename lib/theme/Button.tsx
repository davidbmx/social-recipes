import { VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle';
import { Theme } from './theme';
import Touchable from './Touchable';

const Button = createRestyleComponent<
	VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Touchable>,
	Theme
>([createVariant({ themeKey: 'buttonVariants' })], Touchable);

export default Button;
