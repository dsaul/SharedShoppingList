import GenerateId from "../utility/GenerateId";

export interface IShoppingListItem {
	uuid: string;
	name: string;
	isPicked: boolean;
	stores: string[];
	departments: string[];
	lastModifiedISO8601: string;
};

export default class ShoppingListItem {
	static MakeEmpty(): IShoppingListItem {
		return {
			uuid: GenerateId(),
			name: '',
			isPicked: false,
			stores: [],
			departments: [],
			lastModifiedISO8601: '1900-01-01T00:00:00.000Z'
		};
	}
}