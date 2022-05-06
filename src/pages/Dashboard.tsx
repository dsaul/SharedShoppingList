import React, { useState } from 'react';
import style from './Dashboard.module.css';
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from '../tmp/Chart';
import Deposits from '../tmp/Deposits';
import Orders from '../tmp/Orders';
import Copyright from '../components/Copyright';

import StoreCard from '../components/Cards/StoreCard';
import ShoppingListItem, { IShoppingListItem } from '../data/ShoppingListItem';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import ShoppingListItemEditor from '../components/ShoppingListItemEditor';

interface IDashboardProps {

};

export default function Dashboard(props: IDashboardProps) {

	const [listItems, setListItems] = useState([
		{
			uuid: 'asd',
			name: 'Chicken Tendies',
			isPicked: false,
			stores: ['Superstore', 'Safeway'],
			departments: ['Meats'],
		},
		{
			uuid: '1313',
			name: 'Toilet Paper',
			isPicked: false,
			stores: ['Superstore'],
			departments: ['Papers'],
		},
		{
			uuid: '1212',
			name: 'Fizzy Water',
			isPicked: false,
			stores: ['Superstore'],
			departments: ['Drinks'],
		},
		{
			uuid: '354adsadsf454',
			name: 'BBQ Almonds',
			isPicked: false,
			stores: ['Safeway'],
			departments: ['Candy'],
		},
	] as IShoppingListItem[]);

	const [addDialogueOpen, setAddDialogueOpen] = React.useState(false);
	const [deleteDialogueOpen, setDeleteDialogueOpen] = React.useState(false);
	const [editDialogueOpen, setEditDialogueOpen] = React.useState(false);
	
	const [addDataModel, setAddDataModel] = React.useState(ShoppingListItem.MakeEmpty())
	const [editDataModel, setEditDataModel] = React.useState(ShoppingListItem.MakeEmpty())

	const onItemEditedInDataTable = (uuid: string, newValue: IShoppingListItem): void => {

		setListItems((old): IShoppingListItem[] => {
			return old.map((item: IShoppingListItem) => {
				if (item.uuid != uuid)
					return item;

				return newValue;
			});
		});



	};


	
	
	
	
	

	const addNewItem = (): void => {
		setAddDataModel(ShoppingListItem.MakeEmpty());
		setAddDialogueOpen(true);
	}

	const onAddDataModelChanged = (payload: IShoppingListItem) => {
		console.log('onAddDataModelChanged', payload);
	};
	
	const onClickCloseAddDialogue = () => {
		setAddDialogueOpen(false);
		console.log('add new', addDataModel);
	};
	
	
	
	

	
	
	const onEditItem = (uuid: string): void => {
		//setEditDataModel();
		setEditDialogueOpen(true);
	}
	
	const onEditDataModelChanged = (payload: IShoppingListItem) => {
		console.log('onEditDataModelChanged', payload);
		setEditDataModel(payload);
	};
	
	const onClickCloseEditDialogue = () => {
		setEditDialogueOpen(false);
		console.log('edit data model', editDataModel);
	}
	
	
	
	
	
	
	const onDeleteItems = (uuids: string[]): void => {
		setDeleteDialogueOpen(true);
	}
	
	const onClickCloseDeleteDialogue = () => {
		setDeleteDialogueOpen(false);
	}
	
	
	
	
	
	
	
	
	// Get unique stores.
	const uniqueStores: string[] = [];
	for (const item of listItems) {
		for (const store of item.stores) {
			if (uniqueStores.indexOf(store) == -1)
				uniqueStores.push(store);
		}
	}

	//console.log('uniqueStores', uniqueStores);

	return (
		<React.Fragment>

			<Dialog open={addDialogueOpen} onClose={onClickCloseAddDialogue}>
				<DialogTitle>Add Item</DialogTitle>
				<DialogContent>
					<ShoppingListItemEditor model={addDataModel} onModelChanged={onAddDataModelChanged} />
				</DialogContent>
				<DialogActions>
					<Button onClick={onClickCloseAddDialogue}>Cancel</Button>
					<Button onClick={onClickCloseAddDialogue}>Subscribe</Button>
				</DialogActions>
			</Dialog>
			
			
			<Dialog open={editDialogueOpen} onClose={onClickCloseEditDialogue}>
				<DialogTitle>Edit Item</DialogTitle>
				<DialogContent>
					<ShoppingListItemEditor model={editDataModel} onModelChanged={onEditDataModelChanged} />
				</DialogContent>
				<DialogActions>
					<Button onClick={onClickCloseEditDialogue}>Cancel</Button>
					<Button onClick={onClickCloseEditDialogue}>Subscribe</Button>
				</DialogActions>
			</Dialog>
			
			<Dialog open={deleteDialogueOpen} onClose={onClickCloseDeleteDialogue}>
				<DialogTitle>Delete Items</DialogTitle>
				<DialogContent>
					list of items
				</DialogContent>
				<DialogActions>
					<Button onClick={onClickCloseDeleteDialogue}>Cancel</Button>
					<Button onClick={onClickCloseDeleteDialogue}>Subscribe</Button>
				</DialogActions>
			</Dialog>

			{uniqueStores.map((storeName) => {
				return (
					<StoreCard
						key={storeName}
						storeName={storeName}
						items={listItems}
						onItemEdited={onItemEditedInDataTable}
						onEditItem={onEditItem}
						onDeleteItems={onDeleteItems}
						addNewItem={addNewItem}
					/>
				);
			})}
		</React.Fragment>
	);
}
