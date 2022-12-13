
import { Box, Typography, Link, Breadcrumbs } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DahsboardIndicatorPanel from '../../components/DashboardIndicatorPanel/index';

export default function Dashbaord() {

	function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		event.preventDefault();
		console.info('You clicked a breadcrumb.');
	}

	const breadcrumbs = [
		<Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
			Dashboard
		</Link>,
		<Typography key="2" color="text.primary">

		</Typography>,
	];

	return (
		<Box sx={{ padding: "2rem", width: "100%", flexDirection: 'column', overflow: "auto" }}>
			<h2>Dashboard</h2>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize="small" />}
				aria-label="breadcrumb"
				style={{ marginBottom: "1rem" }}
			>
				{breadcrumbs}
			</Breadcrumbs>
			<DahsboardIndicatorPanel />
		</Box>

	);
}