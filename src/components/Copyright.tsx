import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import styles from './Copyright.module.css';

export interface ICopyrightProps
{
	sx?: SxProps<Theme>;
};

export default function Copyright(props: ICopyrightProps) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}