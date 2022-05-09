import React, { useState, useEffect } from 'react';
import StoreCard from '../components/Cards/StoreCard';
import ShoppingListItem, { IShoppingListItem } from '../data/ShoppingListItem';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import ShoppingListItemEditor from '../components/ShoppingListItemEditor';
import axios from 'axios';
import { DateTime } from 'luxon';

interface IDashboardProps {

};

export default function Dashboard(props: IDashboardProps) {

	// State

	const [listItems, setListItems] = useState([] as IShoppingListItem[]);

	const [addDialogueOpen, setAddDialogueOpen] = React.useState(false);
	const [deleteDialogueOpen, setDeleteDialogueOpen] = React.useState(false);
	const [editDialogueOpen, setEditDialogueOpen] = React.useState(false);

	const [addDataModel, setAddDataModel] = React.useState(ShoppingListItem.MakeEmpty())
	const [editDataModel, setEditDataModel] = React.useState(ShoppingListItem.MakeEmpty())
	const [deleteItemsModel, setDeleteItemsModel] = React.useState([] as IShoppingListItem[]);

	const onItemEditedInDataTable = (uuid: string, newValue: IShoppingListItem): void => {
		
		const now = DateTime.utc();
		newValue.lastModifiedISO8601 = now.toISO();
		
		let editInDataTableDebounceId: any = null;
		setListItems((old): IShoppingListItem[] => {
			
			// Strict mode calls this function twice, so we wrap 
			// the api call in this timeout code so that it doesn't 
			// get called twice.
			if (editInDataTableDebounceId) clearTimeout(editInDataTableDebounceId);
			editInDataTableDebounceId = setTimeout(() => {
				
				//console.log('newValue',JSON.stringify(newValue));
				
				axios.put(`/api/items/${newValue.uuid}`, newValue)
					.then((response) => {
						console.log(response);
					})
			}, 0);
			
			return old.map((item: IShoppingListItem) => {
				if (item.uuid !== uuid)
					return item;

				return newValue;
			});
		});



	};

	// Loading

	let getLoadItemsDebounceId: any = null;
	const loadItems = (): void => {

		if (getLoadItemsDebounceId) clearTimeout(getLoadItemsDebounceId);
		getLoadItemsDebounceId = setTimeout(() => {
			axios.get('/api/items/').then((response) => {
				console.log('loadItems response', response);

				setListItems(response.data);
			});
		}, 0);


	};


	// Init
	useEffect(() => {
		loadItems();


	}, []);



	// Callbacks
	
	const addNewItemNoStore = (): void => {
		const newModel = ShoppingListItem.MakeEmpty();
		newModel.stores = ["Unsorted"];
		setAddDataModel(newModel);
		setAddDialogueOpen(true);
	}
	
	const addNewItem = (storeName: string): void => {

		if (!storeName || storeName.length === 0)
			storeName = "Unsorted";
		const newModel = ShoppingListItem.MakeEmpty();
		newModel.stores = [storeName];
		setAddDataModel(newModel);
		setAddDialogueOpen(true);
	}

	const onAddDataModelChanged = (payload: IShoppingListItem) => {
		//console.log('onAddDataModelChanged', payload);
		const now = DateTime.utc();
		payload.lastModifiedISO8601 = now.toISO();
		setAddDataModel(payload);
	};

	const onClickCloseAddDialogueCancel = () => {
		setAddDialogueOpen(false);
		setAddDataModel(ShoppingListItem.MakeEmpty());
	};

	const onClickCloseAddDialogueAdd = () => {
		setAddDialogueOpen(false);
		console.log('add new', addDataModel);

		let postAddItemDebounceId: any = null;

		setListItems((old): IShoppingListItem[] => {

			// Strict mode calls this function twice, so we wrap 
			// the api call in this timeout code so that it doesn't 
			// get called twice.
			if (postAddItemDebounceId) clearTimeout(postAddItemDebounceId);
			postAddItemDebounceId = setTimeout(() => {
				axios.post(`/api/items/`, addDataModel);
			}, 0);

			return [...old, addDataModel];
		});


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
		const now = DateTime.utc();
		payload.lastModifiedISO8601 = now.toISO();
		setEditDataModel(payload);
	};

	const onClickCloseEditDialogueCancel = () => {
		setEditDialogueOpen(false);
	}

	const onClickCloseEditDialogueEdit = () => {
		setEditDialogueOpen(false);
		//console.log('edit data model', editDataModel);

		let postEditItemDebounceId: any = null;
		setListItems((old): IShoppingListItem[] => {

			// Strict mode calls this function twice, so we wrap 
			// the api call in this timeout code so that it doesn't 
			// get called twice.
			if (postEditItemDebounceId) clearTimeout(postEditItemDebounceId);
			postEditItemDebounceId = setTimeout(() => {
				axios.put(`/api/items/${editDataModel.uuid}`, editDataModel);
			}, 0);



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

		const deleteDebounceIds: Record<string, any> = {};

		setListItems((old: IShoppingListItem[]) => {
			const justIds = deleteItemsModel.map((item) => item.uuid);

			for (const id of justIds) {


				// Strict mode calls this function twice, so we wrap 
				// the api call in this timeout code so that it doesn't 
				// get called twice.
				if (deleteDebounceIds[id]) clearTimeout(deleteDebounceIds[id]);
				deleteDebounceIds[id] = setTimeout(() => {
					axios.delete(`/api/items/${id}`).then((response) => {
						console.log(id, 'deleted, response data', response);
						loadItems();
					});
				}, 0);


			}

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
			
			<Paper elevation={0} square style={{textAlign: 'right', padding: '10px'}}>
				<Button onClick={addNewItemNoStore}>Add Item</Button>
			</Paper>
		</React.Fragment>
	);
}
