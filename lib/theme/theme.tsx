import { createBox, createTheme } from '@shopify/restyle';
import { StyleSheet } from 'react-native';

const palette = {
	purpleLight: '#8C6FF7',
	purpleblack: '#5A31F4',
	purpleDark: '#3F22AB',

	greenLight: '#56DCBA',
	greenblack: '#0ECD9D',
	greenDark: '#0A906E',

	black: '#0B0B0B',
	white: '#F0F2F3',
	primary: '#8C6FF7',
	error: '#cd415e',
};

const theme = createTheme({
	colors: {
		mainBackground: palette.white,
		cardblackBackground: palette.purpleblack,
		white: palette.white,
		black: palette.black,
		primary: palette.primary,
		primaryBlack: palette.purpleblack,
		error: palette.error,
	},
	borderRadii: {
		xs: 1,
		s: 5,
		m: 10,
		l: 15,
		xl: 75,
	},
	spacing: {
		xxs: 4,
		xs: 6,
		s: 8,
		m: 16,
		l: 24,
		xl: 40,
	},
	textVariants: {
		header: {
			fontWeight: 'bold',
			fontSize: 34,
			lineHeight: 42.5,
			color: 'black',
		},
		subheader: {
			fontWeight: '600',
			fontSize: 28,
			lineHeight: 36,
			color: 'black',
		},
		titleMedium: {
			fontWeight: '400',
			fontSize: 20,
			lineHeight: 24,
			color: 'black',
		},
		titleSmall: {
			fontWeight: '300',
			fontSize: 18,
			lineHeight: 20,
			color: 'black',
		},
		titleHeader: {
			fontWeight: '600',
			fontSize: 18,
			lineHeight: 24,
			color: 'black',
		},
		body: {
			fontSize: 16,
			lineHeight: 24,
			color: 'black',
		},
		buttonPrimary: {
			fontWeight: '500',
			fontSize: 18,
			lineHeight: 24,
			color: 'white',
		},
		labels: {
			fontSize: 14,
			fontWeight: '500',
			color: 'primary',
		},
		muted: {
			fontFamily: 'LatoLatin-Regular',
			fontSize: 14,
			color: 'grey',
		},
	},
	buttonVariants: {
		primary: {
			backgroundColor: 'primary',
			borderRadius: 'l',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},
	textInputVariants: {
		normal: {
			borderColor: palette.primary,
			borderWidth: StyleSheet.hairlineWidth,
			borderRadius: 8,
			height: 35,
			fontFamily: 'LatoLatin-Regular',
			fontSize: 16,
			color: palette.purpleblack,
			padding: 6,
		},
		focus: {
			borderColor: palette.greenLight,
		},
		textArea: {
			borderBottomColor: palette.primary,
			borderBottomWidth: 1,
			fontFamily: 'LatoLatin-Regular',
			fontSize: 16,
			color: palette.purpleblack,
			padding: 0,
			paddingBottom: 10,
		},
	},
});

export type Theme = typeof theme;
export default theme;
