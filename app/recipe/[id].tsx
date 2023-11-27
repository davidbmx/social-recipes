import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Container from '../../components/Container';
import Box from '../../lib/theme/Box';
import Text from '../../lib/theme/Text';
import { useMemo, useState } from 'react';
import Touchable from '../../lib/theme/Touchable';
import { Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useRecipe } from '../../lib/hooks/useRecipe';
import Loading from '../../components/Loading';
import IconFontAwesome from '../../components/FontAwsome';
import i18next from '../../locales/i18next';
import TabButtons from '../../components/TabButtons';
import RecipeIngredients from '../../components/RecipeIngredients';
import RecipeSteps from '../../components/RecipeSteps';
import TabPage from '../../components/TabPage';

const RecipePage = () => {
	const { id } = useLocalSearchParams();
	const snapPoints = useMemo(() => ['70%', '100%'], []);
	const { recipe, loading } = useRecipe(Number(id));
	const [tab, setTab] = useState(0);

	if (loading && !recipe) {
		return <Loading loading={true} />;
	}
	console.log(recipe);
	return (
		<Box flex={1}>
			<Box position={'relative'}>
				<Image source={{ uri: recipe?.image }} style={{ width: '100%', height: 300 }} />
				<RoundedButton position={'left'} onPress={() => router.back()}>
					<IconFontAwesome name={'chevron-left'} size={18} color={'jordyblue.700'} />
				</RoundedButton>
				<RoundedButton position={'right'} onPress={() => router.back()}>
					<IconFontAwesome
						name={recipe?.liked ? 'heart' : 'heart'}
						size={18}
						color={'jordyblue.700'}
					/>
				</RoundedButton>
			</Box>
			<BottomSheet index={0} snapPoints={snapPoints}>
				<BottomSheetScrollView style={{ backgroundColor: 'white' }}>
					<Box padding={'s'}>
						<Box flexDirection={'row'} alignItems={'center'} columnGap={'s'}>
							<Box flex={1}>
								<Text variant={'titleHeader'} fontWeight={'bold'}>
									{recipe?.title}
								</Text>
							</Box>
							<Box flexDirection="row" alignItems={'center'} columnGap={'xs'}>
								<IconFontAwesome name={'clock-o'} size={18} color={'alto.200'} />
								<Text variant={'body'} color={'alto.200'}>
									{recipe?.prep_time}
								</Text>
							</Box>
						</Box>
						<Text variant={'body'}>{recipe?.description}</Text>
						<Box marginTop={'l'}>
							<TabButtons onChange={setTab} />
							<Box position="relative" flex={1}>
								<TabPage show={tab === 0} index={0}>
									<RecipeIngredients ingredients={recipe?.ingredients || []} />
								</TabPage>
								<TabPage show={tab === 1} index={1}>
									<RecipeSteps steps={recipe?.steps || []} />
								</TabPage>
							</Box>
						</Box>
					</Box>
				</BottomSheetScrollView>
			</BottomSheet>
		</Box>
	);
};

const RoundedButton = ({
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
		borderRadius={'xl'}
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
