import { useCallback, useEffect, useState } from 'react';
import Container from '../../components/Container';
import SearchInput from '../../components/SearchInput';
import i18next from '../../locales/i18next';
import Box from '../../lib/theme/Box';
import RecipesCard from '../../components/RecipesCard';
import { IRecipe } from '../../lib/interfaces';
import { useRecipes } from '../../lib/hooks/useRecipes';
import Loading from '../../components/Loading';
import { FlashList } from '@shopify/flash-list';

export default function SearchScreen() {
	const [search, setSearch] = useState('');
	const { fetchRecipes, loadMore, loading, recipes, hasNextPage } = useRecipes();

	const onEndReached = () => {
		if (!loading && hasNextPage) {
			loadMore();
		}

		return;
	};

	const renderItem = useCallback(({ item }: { item: IRecipe }) => {
		return <RecipesCard recipe={item} />;
	}, []);

	const itemSeparator = useCallback(() => <Box height={12} />, []);

	// useEffect(() => {
	// 	let idTimeout: NodeJS.Timeout;
	// 	if (search.length > 3) {
	// 		idTimeout = setTimeout(() => {
	// 			fetchRecipes({ search });
	// 		}, 500);
	// 	}

	// 	return () => {
	// 		if (idTimeout) {
	// 			clearTimeout(idTimeout);
	// 		}
	// 	};
	// }, [search]);

	useEffect(() => {
		fetchRecipes();
	}, []);

	return (
		<Container paddingHorizontal={'none'}>
			<Loading loading={loading} />
			<Box padding={'s'}>
				<SearchInput value={search} onChange={setSearch} placeholder={i18next.t('pages.search')} />
			</Box>
			<FlashList
				data={recipes}
				renderItem={renderItem}
				keyExtractor={(item, index) => String(item.id) + index}
				estimatedItemSize={150}
				contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
				ItemSeparatorComponent={itemSeparator}
				onEndReached={onEndReached}
				onEndReachedThreshold={10}
			/>
		</Container>
	);
}
