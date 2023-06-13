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
    TablePagination,
    imageListItemBarClasses
} from '@material-ui/core';
import Page from '@/components/Page';
import Label from '@/components/Label';
import Scrollbar from '@/components/Scrollbar';
import SearchNotFound from '@/components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '@/components/_dashboard/user';
import useFetcher from '@/hooks/useFetcher';
import { API_URL } from "@/config/api.js"

const TABLE_HEAD: HeaderLabel[] = [
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'target', label: 'Target', alignRight: false },
    { id: 'deadline', label: 'Deadline', alignRight: false },
    { id: 'collected', label: 'Collected', alignRight: false },
    { id: 'remainingDays', label: 'RemainingDays', alignRight: false },
    { id: 'createdAt', label: 'Created At', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
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
            (_campaign) => _campaign.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

interface Campaign {
  id: number;
  title: string;
  slug: string;
  image: string;
  target: number;
  deadline: string;
  collected: number;
  remainingDays: string;
  active: boolean;
  _links: object;
  createdAtDateOnly: string;
}

const Campaigns = (): JSX.Element => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState<Campaign[]>([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const fetcher = useFetcher()

    const getCampaigns = async () => {
        try {
            const response = await fetcher(`${API_URL}/allCampaigns`)
            setCampaigns(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCampaigns()
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(campaigns);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - campaigns.length) : 0;

    const filteredCampaigns = applySortFilter(campaigns, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredCampaigns.length === 0;

    const getColor = (status) => {
      const colors = {
        pending: 'warning',
        active: 'primary',
        inactive: 'error'
      }
      return colors[status]
    }

    const handleFilterByName = (event) => {
      setFilterName(event.target.value);
  };

    return (
        <Page title="Campaign">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Campaigns
                    </Typography>
                </Stack>

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    checkbox={false}
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={campaigns.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredCampaigns
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                id,
                                                title, 
                                                image,
                                                target,
                                                deadline,
                                                collected,
                                                remainingDays,
                                                slug,
                                                active,
                                                status,
                                                createdAtDateOnly
                                            } = row;
                                            const isItemSelected = selected.indexOf(title) !== -1;

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
                                                            <Avatar alt={title} src={image} />
                                                            <Typography maxWidth="100px" variant="subtitle2" noWrap>
                                                                {title}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{target}</TableCell>
                                                    <TableCell align="left">{deadline}</TableCell>
                                                    <TableCell align="left">{collected}</TableCell>
                                                    <TableCell align="left">{remainingDays} days</TableCell>
                                                    <TableCell align="left">{createdAtDateOnly}</TableCell>
                                                    <TableCell align="left">
                                                        <Label
                                                            variant="ghost"
                                                            color={getColor(status)}
                                                        >
                                                            {sentenceCase(status)}
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
                        count={campaigns.length}
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

export default Campaigns;
