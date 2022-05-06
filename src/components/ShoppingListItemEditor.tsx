import { DialogContentText, TextField } from "@mui/material";
import { IShoppingListItem } from "../data/ShoppingListItem";



interface IShoppingListItemEditorProps {
	model: IShoppingListItem;
	onModelChanged: (payload: IShoppingListItem) => void;
};

export default function (props: IShoppingListItemEditorProps) {
	return (
		<>
			<DialogContentText>
				To subscribe to this website, please enter your email address here. We
				will send updates occasionally.
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Email Address"
				type="email"
				fullWidth
				variant="standard"
			/>

		</>
	);
}