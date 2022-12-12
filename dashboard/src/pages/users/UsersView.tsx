
import { Box, Typography, Link, Breadcrumbs, Stack } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import UserLists from './UsersList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserList } from '../../store/actions/AdminAction';
import { useEffect } from 'react';

export default function UsersView() {
	const dispatch = useAppDispatch();
	const users = useAppSelector(state => state.admin.users);

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

	useEffect(() => {
		if (!users)
			dispatch(fetchUserList({}));
	}, []);

	return (
		<Box sx={{ display: 'flex', width: '100%' }}>
			<Box component="main" sx={{ flexGrow: 1, p: 5 }}>
				<h2>Dashboard</h2>
				<Stack spacing={2}>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize="small" />}
						aria-label="breadcrumb"
					>
						{breadcrumbs}
					</Breadcrumbs>
				</Stack>
			
				{users && <UserLists rows={users}/> }
			</Box>
		</Box>
	);
}