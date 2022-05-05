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
import { IShoppingListItem } from '../data/ShoppingListItem';

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

	const onItemEdited = (uuid: string, newValue: IShoppingListItem): void => {

		setListItems((old): IShoppingListItem[] => {
			return old.map((item: IShoppingListItem) => {
				if (item.uuid != uuid)
					return item;

				return newValue;
			});
		});



	};


	const onEditItem = (uuid: string): void => {
		console.log('onEditItem', uuid);
	}
	
	const onDeleteItems = (uuids: string[]): void => {
		console.log('onDeleteItems', uuids);
	}
	
	const addNewItem = (): void => {
		console.log('addNewItem');
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
			{uniqueStores.map((storeName) => {
				return (
					<StoreCard
						key={storeName}
						storeName={storeName}
						items={listItems}
						onItemEdited={onItemEdited}
						onEditItem={onEditItem}
						onDeleteItems={onDeleteItems}
						addNewItem={addNewItem}
					/>
				);
			})}
		</React.Fragment>
	);
}
