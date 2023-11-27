import { useEffect, useState } from 'react';
import { getRecipe } from '../api';
import { IError } from '../interfaces/errors';
import { router } from 'expo-router';
import { IRecipe } from '../interfaces';

export const useRecipe = (recipeId: number) => {
	const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);
	const [loading, setLoading] = useState(false);

	const fetchRecipe = () => {
		setLoading(true);
		getRecipe(recipeId)
			.then(response => {
				setRecipe(response);
			})
			.catch((error: IError) => {
				if (error.status === 404) {
					router.replace('/404');
				}
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchRecipe();
	}, [recipeId]);

	return { recipe, loading, refetch: fetchRecipe };
};
