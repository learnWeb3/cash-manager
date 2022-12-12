
import { useState } from 'react';
import { Grid, TableContainer, Table, TableCell, TableRow, TableHead, TableBody, Paper, IconButton } from '@mui/material'
import SearchBar from '../../components/form/inputs/SearchBar';
import IUser from '../../types/IUser';
import { useNavigate } from 'react-router-dom';
import { Close, RemoveRedEyeOutlined } from '@mui/icons-material';

interface UserListsProps {
	rows: IUser[];
}

export default function UserLists(props: UserListsProps) {
    const navigate = useNavigate();
	const [rows, setRows] = useState<IUser[]>(props.rows);
	const [searched, setSearched] = useState<string>("");
  
	const requestSearch = (searchedVal: string) => {
	  const filteredRows = props.rows.filter((row) => {
		return row.name.first.toLowerCase().includes(searchedVal.toLowerCase()) 
            || row.name.last.toLowerCase().includes(searchedVal.toLowerCase())
            || row.email.address.toLowerCase().includes(searchedVal.toLowerCase());
	  });
	  setRows(filteredRows);
	};
  
	const cancelSearch = () => {
	  setSearched("");
	  requestSearch(searched);
	};

	return (
        <Grid container paddingTop={5}>
            <Grid item md={6}>
            <SearchBar
                value={searched}
                onChange={requestSearch}
                onCancel={() => cancelSearch()}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name.first} {row.name.last}
                        </TableCell>
                        <TableCell>{row.email.address}</TableCell>
                        <TableCell component="th" scope="row">{row.role}</TableCell>
                        <TableCell align="right">
                            <IconButton
                                color="primary"
                                onClick={() => navigate('/users/'+row._id)}
                            >
                                <RemoveRedEyeOutlined />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => {}}
                            >
                                <Close />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
        </Grid>
	);
}