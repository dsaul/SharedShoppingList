import React from 'react';
import style from './About.module.css';
import { Routes, Route, Link } from "react-router-dom";
import { Box } from '@mui/system';
import { Paper, Stack } from '@mui/material';

interface IAboutProps {

};

export default function About(props: IAboutProps) {
	return (
		<Box>
			<Paper elevation={0} square>
				<Box padding={1} paddingBottom={0} paddingX={2}>
					<div style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold'}}>
						Shared Shopping List
					</div>
					<div style={{textAlign: 'center', fontSize: '16px'}}>
						By Dan Saul
					</div>
				</Box>
			</Paper>
		</Box>
	);
}
