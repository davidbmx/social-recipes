import { IUser } from './user';

export interface IRecipe {
	id: number;
	user: Pick<IUser, 'uid' | 'username' | 'avatar'>;
	title: string;
	description: string;
	dificulty: string;
	prep_time: string;
	cook_time: string;
	bill_spent: number;
	tags: ITag[];
	likes: number;
	bookmarks: number;
	visibility: 'EASY' | 'MEDIUM' | 'HARD';
	steps?: IStep[];
	ingredients?: IIngredient[];
	image: string;
	liked: boolean;
}

export interface ITag {
	id: string;
	name: string;
}

export interface IStep {
	id: string;
	recipe: number;
	step: number;
	description: string;
	image: string;
}

export interface IIngredient {
	id: number;
	recipe: number;
	quantity: number;
	description: string;
}

export interface IRecipesParams {
	page?: number;
	search?: string;
}

export type TRecipeForm = Pick<
	IRecipe,
	'title' | 'description' | 'visibility' | 'cook_time' | 'bill_spent' | 'dificulty' | 'prep_time'
>;

export type TStepForm = Pick<IStep, 'step' | 'description'>;

export type TIngredientForm = Pick<IIngredient, 'description' | 'quantity'>;
