import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { HeaderLabel, IUser } from '@/models';
import { sentenceCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@material-ui/core';
import Page from '@/components/Page';
import Label from '@/components/Label';
import Scrollbar from '@/components/Scrollbar';
import SearchNotFound from '@/components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '@/components/_dashboard/user';
// import users from '@/_mocks_/user';
import useFetcher from '@/hooks/useFetcher';
import { API_URL } from "@/config/api.js"

const TABLE_HEAD: HeaderLabel[] = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'email', alignRight: false },
    { id: 'birthDate', label: 'Birth', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

interface User {
    name: string;
    email: string;
    photo: string;
    birthDate: string;
    role: string;
}

const User = (): JSX.Element => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState<User[]>([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState<User[]>([])
    const fetcher = useFetcher()

    const getUsers = async () => {
        try {
            const response = await fetcher(`${API_URL}/allUsers`)
            setUsers(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(users);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: IUser[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="User | AksiHijau">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                </Stack>

                <Card>
                    {/* <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    /> */}

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={users.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                id,
                                                name,
                                                role,
                                                photo,
                                                email,
                                                birthDate
                                            } = row;
                                            const isItemSelected = selected.indexOf(name) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <Avatar alt={name} src={photo} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{email}</TableCell>
                                                    <TableCell align="left">{birthDate}</TableCell>
                                                    <TableCell align="left">{role}</TableCell>
                                                    <TableCell align="left">
                                                        <Label
                                                            variant="ghost"
                                                            color='success'
                                                        >
                                                            {sentenceCase('active')}
                                                        </Label>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <UserMoreMenu />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
};

export default User;
