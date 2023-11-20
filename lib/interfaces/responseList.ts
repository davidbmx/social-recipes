export interface IResponseList<T> {
	count: number;
	next: string;
	previous: string;
	results: T[];
}
