import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { BoxProps, useTheme } from '@shopify/restyle';
import { Theme } from '../lib/theme/theme';
import Text from '../lib/theme/Text';
import Box from '../lib/theme/Box';

interface Props extends TextInputProps {
	label?: string;
	optional?: boolean;
	error?: string;
	containerBoxStyle?: Partial<BoxProps<Theme>>;
}

export const Input = ({ label, optional, error, containerBoxStyle, ...rest }: Props) => {
	const theme = useTheme<Theme>();
	const [focused, setFocused] = useState(false);

	return (
		<Box {...containerBoxStyle}>
			{label && (
				<Text
					variant={'labels'}
					color={focused ? 'jordyblue.700' : 'jordyblue.500'}
					marginBottom={'s'}
				>
					{label} {optional ? <Text variant={'body'}>(opcional)</Text> : ''}
				</Text>
			)}
			<TextInput
				{...rest}
				placeholderTextColor={theme.colors['jordyblue.500']}
				style={[theme.textInputVariants.normal, focused && theme.textInputVariants.focus]}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			{error ? (
				<Text variant={'muted'} color={'scarlet.700'} marginTop="s">
					{error}
				</Text>
			) : null}
		</Box>
	);
};
