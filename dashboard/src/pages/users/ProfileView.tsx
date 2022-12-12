import { Box, Breadcrumbs, Stack, Typography, Link, Grid } from "@mui/material";
import {  NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import IUser from "../../types/IUser";
import { fetchOneUser } from "../../store/actions/AdminAction";
import { useNavigate, useParams } from "react-router-dom";


export default function Profile() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
    const { userId } = useParams();
    const user = useAppSelector(state => state.admin.user);

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" onClick={() => navigate('/users')}>
          	Users
        </Link>,
        <Typography key="2" color="text.primary">
            {user?.name.first} {user?.name.last}
        </Typography>
    ];

	useEffect(() => {
        dispatch(fetchOneUser({_id: userId || ""}));
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

				<Grid container paddingTop={5}>
					<Grid style={{backgroundColor: "#fff", marginRight: "20px", borderRadius: "15px"}} item md={2}>
						<div className="flex-center">
							<img style={{borderRadius: "15px"}} width={"100%"} src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" />
						</div>
						<div style={{padding: "0px 20px 20px 20px"}}>
							<h3 style={{marginBottom: "0px"}}>{user?.role}</h3>
							<h2 style={{marginBottom: "0px"}}>{user?.name.first} {user?.name.last}</h2>
							<small>{user?.email.address}</small>
						</div>
					</Grid>
					<Grid style={{backgroundColor: "#fff", marginLeft: "20px", borderRadius: "15px"}} item md={9}>
						Right
					</Grid>
				</Grid>
				
			</Box>
		</Box>
	);
}