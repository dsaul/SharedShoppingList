import React, { MouseEventHandler, useState } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import {
	DataGrid,
	GridColDef,
	GridSelectionModel,
	GridCallbackDetails,
	GridRowModel,
	GridCellParams,
	MuiEvent,
	GridValueSetterParams,
	GridRenderCellParams,
	GridFilterModel,
} from '@mui/x-data-grid';
import {
	IShoppingListItem
} from '../../data/ShoppingListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface IStoreCardProps {
	storeName: string;
	items: IShoppingListItem[];
	onItemEdited: (uuid: string, newValue: IShoppingListItem) => void;
	onEditItem: (uuid: string) => void;
	onDeleteItems: (uuids: string[]) => void;
	addNewItem: () => void;
};


export default function StoreCard(props: IStoreCardProps) {

	const [selectionModel, setSelectionModel] = useState([

	] as GridSelectionModel);

	// eslint-disable-next-line
	const [filterModel, setFilterModel] = useState({
		items: [
			{
				id: 'defaultStoreFilter',
				columnField: 'stores',
				value: props.storeName,
				operatorValue: 'contains',
			}
		]
	} as GridFilterModel);





	const columns: GridColDef[] = [
		// {
		// 	field: 'uuid',
		// 	headerName: 'ID',
		// 	width: 70
		// },
		{
			field: 'actions',
			headerName: 'Actions',
			width: 50,
			renderCell: (params: GridRenderCellParams) => {

				//console.log('renderCell params',params);

				return (
					<IconButton onClick={() => { props.onEditItem((params.row as IShoppingListItem).uuid) }}>
						<EditIcon />
					</IconButton>
				)
			}
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 130,
			editable: true,
			valueSetter: (params: GridValueSetterParams) => {

				const modified = {
					...(params.row as IShoppingListItem),
					name: params.value,
				};
				props.onItemEdited((params.row as IShoppingListItem).uuid, modified);
				//console.log('Name saved', modified);
				return modified;
			}
		},
		{
			field: 'isPicked',
			headerName: 'Picked',
			width: 70,
			type: 'boolean',
			editable: true,
			valueSetter: (params: GridValueSetterParams) => {

				const modified = {
					...(params.row as IShoppingListItem),
					isPicked: params.value,
				};
				props.onItemEdited((params.row as IShoppingListItem).uuid, modified);
				//console.log('isPicked saved', modified);
				return modified;
			}
		},
		{
			field: 'departments',
			headerName: 'Department (s)',
			width: 120,
			editable: false,
		},
		{
			field: 'stores',
			headerName: "Stores",
			hide: true,
			hideable: true,
		},
		// {
		// 	field: 'age',
		// 	headerName: 'Age',
		// 	type: 'number',
		// 	width: 90,
		// },
		// {
		// 	field: 'fullName',
		// 	headerName: 'Full name',
		// 	description: 'This column has a value getter and is not sortable.',
		// 	sortable: false,
		// 	width: 160,
		// 	valueGetter: (params: GridValueGetterParams) =>
		// 		`${params.row.firstName || ''} ${params.row.lastName || ''}`,
		// },
	];



	const onSelectionModelChange = (
		newSelectionModel: GridSelectionModel,
		details: GridCallbackDetails
	): void => {
		setSelectionModel((old) => newSelectionModel);
		console.debug('onSelectionModelChange', selectionModel, details);
	};

	const isCellEditable = (
		params: GridCellParams
	): boolean => {
		return true;
	}

	const getRowId = (
		model: GridRowModel
	): string => {
		return model.uuid;
	};

	// const filteredItems = props.items.filter((item): boolean => {
	// 	return item.stores.indexOf(props.storeName) != -1;
	// });

	const onClickDelete: MouseEventHandler = (e) => {
		props.onDeleteItems(selectionModel as string[]);
	};

	const onClickAdd: MouseEventHandler = (e) => {
		props.addNewItem();
	};

	return (
		<Box >
			<Paper elevation={0} square>
				<Box padding={1} paddingBottom={0} paddingX={2}>
					<Stack direction="row" spacing={2}>
						<Typography variant="subtitle1" component="h2" sx={{ fontSize: '24px', width: '100%' }}>
							{props.storeName}
						</Typography>
						<IconButton aria-label="delete" onClick={onClickDelete} disabled={selectionModel.length === 0}>
							<DeleteIcon />
						</IconButton>
						<IconButton aria-label="add" onClick={onClickAdd}>
							<AddIcon />
						</IconButton>
					</Stack>

				</Box>
				<Box padding={1} paddingTop={0} style={{ height: 400, width: '100%' }}>
					<DataGrid
						rows={props.items}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						checkboxSelection
						onSelectionModelChange={onSelectionModelChange}
						editMode="cell"
						isCellEditable={isCellEditable}
						getRowId={getRowId}
						selectionModel={selectionModel}
						disableSelectionOnClick={true}
						filterModel={filterModel}
						disableColumnFilter={true}
					/>
				</Box>
			</Paper>
		</Box>
	);
}