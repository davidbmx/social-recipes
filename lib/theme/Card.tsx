import { VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle';
import Box from './Box';
import { Theme } from './theme';

const Card = createRestyleComponent<
	VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
	Theme
>([createVariant({ themeKey: 'cardVariants' })], Box);

Card.defaultProps = {
	variant: 'default',
};

export default Card;
