import { DialogContentText, FormControlLabel, Switch, TextField } from "@mui/material";
import { IShoppingListItem } from "../data/ShoppingListItem";
import StringListEditor from "./StringListEditor";


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
	
	const onStoresChanged = (payload: string[]) => {
		console.debug('onStoresChanged', payload);
		const o: IShoppingListItem = {
			...props.model,
			stores: payload,
		};
		
		props.onModelChanged(o);
	};
	
	const onDepartmentsChanged = (payload: string[]) => {
		console.debug('onDepartmentsChanged', payload);
		const o: IShoppingListItem = {
			...props.model,
			departments: payload,
		};
		
		props.onModelChanged(o);
	};
	
	return (
		<>
			
			<TextField
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
			<DialogContentText style={{
				marginTop: '10px',
				color: "rgba(0, 0, 0, 0.87)",
				fontWeight: "bold"
			}}>
				Stores
			</DialogContentText>
			<StringListEditor model={props.model.stores} onModelChanged={onStoresChanged} />
			<DialogContentText style={{
				marginTop: '10px',
				color: "rgba(0, 0, 0, 0.87)",
				fontWeight: "bold"
			}}>
				Departments
			</DialogContentText>
			<StringListEditor model={props.model.departments} onModelChanged={onDepartmentsChanged} />
		</>
	);
}