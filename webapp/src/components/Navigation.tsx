// import style from './Navigation.module.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import ViewListIcon from '@mui/icons-material/ViewList';
import InfoIcon from '@mui/icons-material/Info';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Link as RouterLink } from "react-router-dom";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: 'border-box',
			...(!open && {
				overflowX: 'hidden',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(7),
				},
			}),
		},
	}),
);


interface INavigationProps {
	isDrawerOpen: boolean;
	performToggleDrawer: () => void;
};

export default function Navigation(props: INavigationProps) {
	
	
	
	return (
		<Drawer variant="permanent" open={props.isDrawerOpen}>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					px: [1],
				}}
				>
				<IconButton onClick={props.performToggleDrawer}>
					<ChevronLeftIcon />
				</IconButton>
			</Toolbar>
			<Divider />
			<List component="nav">
				<RouterLink to="/" style={{textDecoration: 'inherit', color: 'inherit'}}>
					<ListItemButton>
						<ListItemIcon>
							<ViewListIcon />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</RouterLink>
				<RouterLink to="/about" style={{textDecoration: 'inherit', color: 'inherit'}}>
					<ListItemButton>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary="About" />
					</ListItemButton>
				</RouterLink>
				{/* <Divider sx={{ my: 1 }} />
				<ListSubheader component="div" inset>
					Saved reports
				</ListSubheader>
				<ListItemButton>
					<ListItemIcon>
						<AssignmentIcon />
					</ListItemIcon>
					<ListItemText primary="Current month" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<AssignmentIcon />
					</ListItemIcon>
					<ListItemText primary="Last quarter" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<AssignmentIcon />
					</ListItemIcon>
					<ListItemText primary="Year-end sale" />
				</ListItemButton> */}
			</List>
		</Drawer>
	);
}