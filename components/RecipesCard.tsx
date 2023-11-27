import { Image, StyleSheet } from 'react-native';
import Box from '../lib/theme/Box';
import Card from '../lib/theme/Card';
import Text from '../lib/theme/Text';
import UserInfo from './UserInfo';
import { IRecipe } from '../lib/interfaces';
import Touchable from '../lib/theme/Touchable';
import IconFontAwesome from './FontAwsome';
import { Link } from 'expo-router';

const RecipesCard = ({ recipe }: { recipe: IRecipe }) => {
	return (
		<Link
			href={{
				pathname: '/recipe/[id]',
				params: { id: recipe.id },
			}}
			asChild
		>
			<Touchable>
				<Card flexDirection="row" alignItems={'center'} columnGap={'s'} padding={'s'}>
					<Image source={{ uri: recipe.image }} resizeMode={'contain'} style={style.image} />
					<Box flex={1} rowGap={'xs'}>
						<Text>{recipe.title}</Text>
						<UserInfo name={recipe.user.username} image={recipe.user.avatar} size={28} />
					</Box>
					<Box backgroundColor={'jordyblue.500'} padding={'xs'} borderRadius={'m'}>
						<IconFontAwesome name={'arrow-right'} size={14} color={'jordyblue.50'} />
					</Box>
				</Card>
			</Touchable>
		</Link>
	);
};

const style = StyleSheet.create({
	image: {
		width: 80,
		height: 75,
	},
});

export default RecipesCard;
