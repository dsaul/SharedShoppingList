import React from 'react';
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

interface IDashboardProps {
	
};

export default (props: IDashboardProps) => {
	return (
		<React.Fragment>
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Grid container spacing={3}>
					{/* Chart */}
					<Grid item xs={12} md={8} lg={9}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: 240,
							}}
							>
							<Chart />
						</Paper>
					</Grid>
					{/* Recent Deposits */}
					<Grid item xs={12} md={4} lg={3}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: 240,
							}}
							>
							<Deposits />
						</Paper>
					</Grid>
					{/* Recent Orders */}
					<Grid item xs={12}>
						<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
							<Orders />
						</Paper>
					</Grid>
				</Grid>
				<Copyright sx={{ pt: 4 }} />
			</Container>
			
			<div>dashboard</div>
		</React.Fragment>
	);
}
