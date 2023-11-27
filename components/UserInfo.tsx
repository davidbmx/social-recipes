import { Image } from 'react-native';
import Box from '../lib/theme/Box';
import Text from '../lib/theme/Text';
import Avatar from './Avatar';

const UserInfo = ({ image, name, size }: { image: string; name: string; size: number }) => {
	return (
		<Box flexDirection={'row'} alignItems={'center'} columnGap={'xs'}>
			<Avatar image={image} name={name} size={size} />
			<Box flex={1}>
				<Text variant={'body'} color={'alto.300'}>
					{name}
				</Text>
			</Box>
		</Box>
	);
};

export default UserInfo;
