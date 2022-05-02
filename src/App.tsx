import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import CssBaseline from '@mui/material/CssBaseline';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Navigation from './components/Navigation';


const mdTheme = createTheme();


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));


export default () => {
	
	
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	
	
	
	
	
	return (
		<React.Fragment>
			<CssBaseline />
			
			<ThemeProvider theme={mdTheme}>
				<Box sx={{ display: 'flex' }}>
					
					<AppBar position="absolute" open={open}>
						<Toolbar
							sx={{
								pr: '24px', // keep right padding when drawer closed
							}}
							>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="open drawer"
								onClick={toggleDrawer}
								sx={{
									marginRight: '36px',
									...(open && { display: 'none' }),
								}}
								>
								<MenuIcon />
							</IconButton>
							<Typography
								component="h1"
								variant="h6"
								color="inherit"
								noWrap
								sx={{ flexGrow: 1 }}
								>
								Dashboard
							</Typography>
							<IconButton color="inherit">
								<Badge badgeContent={4} color="secondary">
									<NotificationsIcon />
								</Badge>
							</IconButton>
						</Toolbar>
					</AppBar>
					<Navigation isDrawerOpen={open} performToggleDrawer={toggleDrawer} />
					<Box
						component="main"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.mode === 'light'
									? theme.palette.grey[100]
									: theme.palette.grey[900],
							flexGrow: 1,
							height: '100vh',
							overflow: 'auto',
						}}
						>
						<Toolbar />
						
						
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/settings" element={<Settings />} />
						</Routes>
						
						
					</Box>
				</Box>
			</ThemeProvider>
			
		</React.Fragment>
	);
}
