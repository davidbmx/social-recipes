import { TextInput } from 'react-native';
import Box from '../lib/theme/Box';
import IconFontAwesome from './FontAwsome';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../lib/theme/theme';
import { useState } from 'react';

interface Props {
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, value, onChange }: Props) => {
	const theme = useTheme<Theme>();
	const [focused, setFocused] = useState(false);

	return (
		<Box
			flexDirection={'row'}
			alignItems={'center'}
			columnGap={'s'}
			style={[
				theme.textInputVariants.normal,
				focused && theme.textInputVariants.focus,
				{ height: 45, borderRadius: 20 },
			]}
		>
			<IconFontAwesome name={'search'} size={18} />
			<TextInput
				placeholder={placeholder}
				value={value}
				keyboardType={'web-search'}
				inputMode={'search'}
				onChangeText={onChange}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				style={{ flex: 1 }}
			/>
		</Box>
	);
};

export default SearchInput;
