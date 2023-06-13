import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';

const UserMoreMenu = ({ status, slug, handleUpdateStatus }): JSX.Element => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClickAction = (status) => {
        setIsOpen(false)
        handleUpdateStatus(slug, status)
    }

    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Icon icon={moreVerticalFill} width={20} height={20} />
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {/* <MenuItem sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <Icon icon={trash2Outline} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem> */}

                {status !== 'active' && (
                    <MenuItem onClick={() => handleClickAction('active')} component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <Icon icon="fontisto:checkbox-active" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Active" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                )}

                {status !== 'pending' && (
                    <MenuItem onClick={() => handleClickAction('pending')} component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <Icon icon="material-symbols:pending-outline" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Pending" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                )}

                {status !== 'inactive' && (
                    <MenuItem onClick={() => handleClickAction('inactive')} component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <Icon icon="material-symbols:block" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Inactive" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export default UserMoreMenu;
