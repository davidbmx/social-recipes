import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Container from '../../components/Container';
import Box from '../../lib/theme/Box';
import Text from '../../lib/theme/Text';
import { useCallback, useMemo, useRef } from 'react';
import Touchable from '../../lib/theme/Touchable';
import { Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useRecipe } from '../../lib/hooks/useRecipe';
import Loading from '../../components/Loading';
import IconFontAwesome from '../../components/FontAwsome';

const RecipePage = () => {
	const { id } = useLocalSearchParams();
	const snapPoints = useMemo(() => ['70%', '100%'], []);
	const { recipe, loading } = useRecipe(Number(id));

	if (loading && !recipe) {
		return <Loading loading={true} />;
	}

	return (
		<Box flex={1}>
			<Box position={'relative'}>
				<Image source={{ uri: recipe?.image }} style={{ width: '100%', height: 300 }} />
				<SquareButton position={'left'} onPress={() => router.back()}>
					<IconFontAwesome name={'chevron-left'} size={18} color={'jordyblue.700'} />
				</SquareButton>
				<SquareButton position={'right'} onPress={() => router.back()}>
					<IconFontAwesome
						name={recipe?.liked ? 'heart' : 'heart'}
						size={18}
						color={'jordyblue.700'}
					/>
				</SquareButton>
			</Box>
			<BottomSheet index={0} snapPoints={snapPoints}>
				<BottomSheetScrollView style={{ backgroundColor: 'white' }}>
					<Box>
						<Text>Asome</Text>
					</Box>
				</BottomSheetScrollView>
			</BottomSheet>
		</Box>
	);
};

const SquareButton = ({
	position,
	children,
	onPress,
}: {
	position: 'left' | 'right';
	children: React.ReactNode;
	onPress: () => void;
}) => (
	<Touchable
		backgroundColor={'white'}
		justifyContent={'center'}
		alignItems={'center'}
		borderRadius={'m'}
		position={'absolute'}
		top={'20%'}
		right={position === 'right' ? 15 : undefined}
		left={position === 'left' ? 15 : undefined}
		width={35}
		height={35}
		onPress={onPress}
	>
		{children}
	</Touchable>
);

export default RecipePage;
