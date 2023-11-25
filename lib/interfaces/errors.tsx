export interface IError {
	status?: number;
	detail?: string;
	fields?: Record<string, string[]>;
	code?: string;
}
