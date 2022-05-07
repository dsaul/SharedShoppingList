import { FormControlLabel, Switch, TextField } from "@mui/material";
import { IShoppingListItem } from "../data/ShoppingListItem";


interface IShoppingListItemEditorProps {
	model: IShoppingListItem;
	onModelChanged: (payload: IShoppingListItem) => void;
};

export default function ShoppingListItemEditor(props: IShoppingListItemEditorProps) {
	
	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		const payload: IShoppingListItem = {
			...props.model,
			name: e.target.value,
		};
		
		props.onModelChanged(payload);
	};
	
	const onPickedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		const payload: IShoppingListItem = {
			...props.model,
			isPicked: e.target.checked,
		};
		
		props.onModelChanged(payload);
	};
	
	return (
		<>
			{/* <DialogContentText>
				
			</DialogContentText> */}
			<TextField
				autoFocus
				id="name"
				label="Name"
				type="text"
				fullWidth
				variant="standard"
				value={props.model.name}
				onChange={onNameChange}
			/>
			<FormControlLabel
				control={<Switch checked={props.model.isPicked} onChange={onPickedChanged} />}
				label="Is Picked"
				sx={{marginTop: '10px'}}
				
			/>
			

		</>
	);
}