import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { TypographyTypeMap } from '@mui/material/Typography/Typography'
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export interface ICopyrightProps
{
	sx?: SxProps<Theme>;
};

export default (props: ICopyrightProps) => {
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