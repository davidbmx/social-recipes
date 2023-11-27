import { useRef, useState } from 'react';
import API from '../api/API';
import { IRecipe, IRecipesParams } from '../interfaces';
import { getRecipes } from '../api';
import { IError } from '../interfaces/errors';
import { IResponseList } from '../interfaces/responseList';

export const useRecipes = () => {
	const params = useRef<IRecipesParams>({ page: 1 });
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<IResponseList<IRecipe>>({
		results: [],
		count: 0,
		next: undefined,
		previous: undefined,
	});

	const doRequest = (params: IRecipesParams) => {
		setLoading(true);
		getRecipes(params)
			.then(response => {
				if (response.results.length) {
					setResult(curr => ({
						...response,
						results: [...curr.results, ...response.results],
					}));
				}
				setResult(response);
			})
			.catch((error: IError) => {
				console.log(error.detail);
			})
			.finally(() => setLoading(false));
	};

	const fetchRecipes = async (query?: IRecipesParams) => {
		params.current = {
			...query,
			page: 1,
		};
		doRequest({ ...params.current });
	};

	const loadMore = () => {
		params.current = {
			...params.current,
			page: Number(params.current.page) + 1,
		};
		doRequest(params.current);
	};

	return {
		fetchRecipes,
		loadMore,
		loading,
		recipes: result.results,
		hasNextPage: Boolean(result.next),
	};
};
