import React, { useState } from 'react';
import StoreCard from '../components/Cards/StoreCard';
import ShoppingListItem, { IShoppingListItem } from '../data/ShoppingListItem';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
	const [deleteItemsModel, setDeleteItemsModel] = React.useState([] as IShoppingListItem[]);

	const onItemEditedInDataTable = (uuid: string, newValue: IShoppingListItem): void => {

		setListItems((old): IShoppingListItem[] => {
			return old.map((item: IShoppingListItem) => {
				if (item.uuid !== uuid)
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

	const onClickCloseAddDialogueCancel = () => {
		setAddDialogueOpen(false);
		setAddDataModel(ShoppingListItem.MakeEmpty());
	};

	const onClickCloseAddDialogueAdd = () => {
		setAddDialogueOpen(false);
		console.log('add new', addDataModel);
	};





	const onEditItem = (uuid: string): void => {

		const found = listItems.filter((o) => o.uuid === uuid);
		if (found.length === 0)
			return;
		const first = found[0];

		setEditDataModel(first);
		setEditDialogueOpen(true);
	}

	const onEditDataModelChanged = (payload: IShoppingListItem) => {
		//console.log('onEditDataModelChanged', payload);
		setEditDataModel(payload);
	};

	const onClickCloseEditDialogueCancel = () => {
		setEditDialogueOpen(false);
	}

	const onClickCloseEditDialogueEdit = () => {
		setEditDialogueOpen(false);
		//console.log('edit data model', editDataModel);
		
		setListItems((old): IShoppingListItem[] => {
			return old.map((item: IShoppingListItem) => {
				if (item.uuid !== editDataModel.uuid)
					return item;

				return editDataModel;
			});
		});
	}

	


	const onDeleteItems = (uuids: string[]): void => {
		
		setDeleteItemsModel((old) => {
			return listItems.filter((item) => {
				return uuids.indexOf(item.uuid) !== -1;
			})
		});
		
		setDeleteDialogueOpen(true);
		
		
	}

	const onClickCloseDeleteDialogueCancel = () => {
		setDeleteDialogueOpen(false);
		setDeleteItemsModel(() => []);
	}

	const onClickCloseDeleteDialogueDelete = () => {
		setDeleteDialogueOpen(false);
		console.debug('Actually delete');
		
		setListItems((old: IShoppingListItem[]) => {
			const justIds = deleteItemsModel.map((item) => item.uuid);
			
			const mod = old.filter((item) => {
				return justIds.indexOf(item.uuid) == -1;
			});
			
			return mod;
		});
		
	}






	// Get unique stores.
	const uniqueStores: string[] = [];
	for (const item of listItems) {
		for (const store of item.stores) {
			if (uniqueStores.indexOf(store) === -1)
				uniqueStores.push(store);
		}
	}

	//console.log('uniqueStores', uniqueStores);

	return (
		<React.Fragment>

			<Dialog open={addDialogueOpen}>
				<DialogTitle>Add Item</DialogTitle>
				<DialogContent>
					<ShoppingListItemEditor model={addDataModel} onModelChanged={onAddDataModelChanged} />
				</DialogContent>
				<DialogActions>
					<Button onClick={onClickCloseAddDialogueCancel}>Cancel</Button>
					<Button onClick={onClickCloseAddDialogueAdd}>Add</Button>
				</DialogActions>
			</Dialog>


			<Dialog open={editDialogueOpen}>
				<DialogTitle>Edit Item</DialogTitle>
				<DialogContent>
					<ShoppingListItemEditor model={editDataModel} onModelChanged={onEditDataModelChanged} />
				</DialogContent>
				<DialogActions>
					<Button onClick={onClickCloseEditDialogueCancel}>Cancel</Button>
					<Button onClick={onClickCloseEditDialogueEdit}>Edit</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={deleteDialogueOpen}>
				<DialogTitle>Delete Items</DialogTitle>
				<DialogContent>
					<ul>
						{deleteItemsModel.map((item) => {
							return (<li key={item.uuid}>{item.name}</li>)
						})}
					</ul>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClickCloseDeleteDialogueCancel}>Cancel</Button>
					<Button onClick={onClickCloseDeleteDialogueDelete}>Delete</Button>
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
