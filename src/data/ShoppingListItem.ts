import GenerateId from "../utility/GenerateId";

export interface IShoppingListItem {
	uuid: string;
	name: string;
	isPicked: boolean;
	stores: string[];
	departments: string[];
};

export default class ShoppingListItem {
	static MakeEmpty(): IShoppingListItem {
		return {
			uuid: GenerateId(),
			name: '',
			isPicked: false,
			stores: [],
			departments: [],
		};
	}
}