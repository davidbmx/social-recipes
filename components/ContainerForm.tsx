import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ContainerForm = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const dismissKeyboard = (): void => {
		Keyboard.dismiss();
	};
	return (
		<TouchableWithoutFeedback onPress={dismissKeyboard}>
			<KeyboardAwareScrollView extraHeight={100} contentContainerStyle={{ flex: 1 }}>
				{children}
			</KeyboardAwareScrollView>
		</TouchableWithoutFeedback>
	);
};

export default ContainerForm;
