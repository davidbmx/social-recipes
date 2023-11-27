import { IIngredient } from '../lib/interfaces';
import Box from '../lib/theme/Box';
import Text from '../lib/theme/Text';
import i18next from '../locales/i18next';

const RecipeIngredients = ({ ingredients }: { ingredients: IIngredient[] }) => {
	return (
		<Box marginTop={'m'} flex={1}>
			<Text variant={'titleSmall'} fontWeight={'bold'}>
				{i18next.t('recipe.ingredients')}
			</Text>
			<Box marginTop="m" flex={1}>
				{ingredients.map((item, index) => (
					<Box
						key={item.id}
						flexDirection={'row'}
						columnGap={'s'}
						marginBottom={index === ingredients.length - 1 ? undefined : 'm'}
						borderBottomColor={'alto.200'}
					>
						<Box
							justifyContent={'center'}
							alignItems={'center'}
							borderRadius={'xl'}
							backgroundColor={'jordyblue.700'}
							width={28}
							height={28}
						>
							<Text variant="titleSmall" fontWeight={'bold'} color={'jordyblue.100'}>
								{item.quantity}
							</Text>
						</Box>
						<Box flex={1}>
							<Text variant={'titleMedium'}>{item.description}</Text>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default RecipeIngredients;
