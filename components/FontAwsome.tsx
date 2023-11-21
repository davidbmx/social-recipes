import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ColorProps, useResponsiveProp, useTheme } from '@shopify/restyle';
import { Theme } from '../lib/theme/theme';
import { ComponentProps } from 'react';

const IconFontAwesome = ({
	color = 'jordyblue.700',
	...rest
}: Omit<ComponentProps<typeof FontAwesome>, 'color'> & ColorProps<Theme>) => {
	const theme = useTheme<Theme>();
	const colorProp = useResponsiveProp(color);
	const iColor = theme.colors[colorProp || 'jordyblue.700'];
	return <FontAwesome color={iColor} {...rest} />;
};

export default IconFontAwesome;
