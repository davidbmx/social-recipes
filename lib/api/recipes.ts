import { IRecipe, IRecipesParams, IStep, TRecipeForm, TStepForm } from '../interfaces';
import { IResponseList } from '../interfaces/responseList';
import API from './API';

export const createRecipe = async (body: TRecipeForm): Promise<IRecipe> => {
	return await API.post('/api/recipes/', body).then(response => response.data);
};

export const getRecipe = async (recipeId: number): Promise<IRecipe> => {
	return await API.get(`/recipes/${recipeId}/`).then(response => response.data);
};

export const getRecipes = async (params: IRecipesParams): Promise<IResponseList<IRecipe>> => {
	return await API.get('/recipes/', { params }).then(response => response.data);
};

export const updateRecipe = async (recipeId: number, body: TRecipeForm): Promise<IRecipe> => {
	return await API.patch(`/recipes/${recipeId}/`, body).then(response => response.data);
};

export const deleteRecipe = async (recipeId: number): Promise<void> => {
	return await API.delete(`/recipes/${recipeId}/`).then();
};

// ingredients requests

export const createIngredient = async (recipeId: number, body: TStepForm): Promise<IStep> => {
	return await API.post(`/recipes/${recipeId}/ingredients/`, body).then(response => response.data);
};

export const getIngredient = async (recipeId: number, ingredientId: number): Promise<IStep> => {
	return await API.get(`/recipes/${recipeId}/ingredients/${ingredientId}/`).then(
		response => response.data,
	);
};

export const updateIngredient = async (
	recipeId: number,
	ingredientId: number,
	body: TStepForm,
): Promise<IStep> => {
	return await API.patch(`/recipes/${recipeId}/ingredients/${ingredientId}/`, body).then(
		response => response.data,
	);
};

export const deleteIngredient = async (recipeId: number, ingredientId: number): Promise<void> => {
	return await API.delete(`/recipes/${recipeId}/ingredients/${ingredientId}/`).then();
};

// steps requests

export const createStep = async (recipeId: number, body: TStepForm): Promise<IStep> => {
	return await API.post(`/recipes/${recipeId}/steps/`, body).then(response => response.data);
};

export const getStep = async (recipeId: number, stepId: number): Promise<IStep> => {
	return await API.get(`/recipes/${recipeId}/steps/${stepId}/`).then(response => response.data);
};

export const updateStep = async (
	recipeId: number,
	stepId: number,
	body: TStepForm,
): Promise<IStep> => {
	return await API.patch(`/recipes/${recipeId}/steps/${stepId}/`, body).then(
		response => response.data,
	);
};

export const deleteStep = async (recipeId: number, stepId: number): Promise<void> => {
	return await API.delete(`/recipes/${recipeId}/steps/${stepId}/`).then();
};
