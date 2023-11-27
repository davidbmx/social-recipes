import { IStep } from '../lib/interfaces';
import Box from '../lib/theme/Box';
import i18next from '../locales/i18next';
import Text from '../lib/theme/Text';
import { Image } from 'react-native';

const RecipeSteps = ({ steps }: { steps: IStep[] }) => {
	return (
		<Box marginTop={'m'} flex={1}>
			<Text variant={'titleSmall'} fontWeight={'bold'}>
				{i18next.t('recipe.preparation')}
			</Text>
			<Box marginTop="m" flex={1}>
				{steps.map((item, index) => (
					<Box key={item.id} borderBottomColor={'alto.200'}>
						<Text variant="titleSmall">
							<Text variant="titleSmall" fontWeight={'bold'}>
								{item.step}.
							</Text>{' '}
							{item.description}
						</Text>
						{item.image ? (
							<Box
								marginVertical={'l'}
								borderRadius="l"
								overflow="hidden"
								backgroundColor="alto.200"
							>
								<Image
									source={{ uri: item.image }}
									style={{ width: '100%', height: 200 }}
									resizeMode={'cover'}
								/>
							</Box>
						) : null}
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default RecipeSteps;
