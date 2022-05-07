import { Button, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React from "react";

interface IStringListEditorProps {
	model: string[];
	onModelChanged: (payload: string[]) => void;
};


export default function StringListEditor(props: IStringListEditorProps) {

	const fieldValueChanged = (newStr: string, index: number) => {
		
		const payload = [ ...props.model ];
		payload[index] = newStr;
		props.onModelChanged(payload);
		
	};
	
	const addLineClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
		
		const payload = [
			...props.model,
			''
		];
		props.onModelChanged(payload);
	};
	
	const deleteLineClicked = (index: number) => {
		
		const payload = [ ...props.model ];
		payload.splice(index, 1);
		props.onModelChanged(payload);
		
	};
	
	return (
		<>
			{props.model.map((str, index) => (
				<Stack direction="row" spacing={2} key={index}>
					<TextField
						type="text"
						fullWidth
						variant="standard"
						value={str}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => fieldValueChanged(e.target.value, index)}
					/>
					<IconButton aria-label="delete" onClick={() => { deleteLineClicked(index) }}>
						<DeleteIcon />
					</IconButton>
				</Stack>
			))}
			<Button onClick={addLineClicked} startIcon={<AddIcon />}>Add Line</Button>
		</>
	)
}