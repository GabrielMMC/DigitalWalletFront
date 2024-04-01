import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MdHistory, MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { redirect } from 'next/navigation';
import { logout } from '@/services/auth';
import { User } from '@/domain/User';
import Link from 'next/link';

export default function AccountMenu({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout()
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Ver opções">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user && <Avatar sx={{ width: 40, height: 40, fontSize: '1.8rem' }}>{user.name.charAt(0).toUpperCase()}</Avatar>}
            {!user && <Avatar sx={{ width: 40, height: 40, fontSize: '1.8rem' }} />}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!user ?
          <MenuItem onClick={() => redirect('/auth/login')}>
            <ListItemIcon>
              <MdLogin />
            </ListItemIcon>
            Login
          </MenuItem>
          :
          <div>
            <Link href='/historic'>
              <MenuItem>
                <ListItemIcon>
                  <MdHistory />
                </ListItemIcon>
                Historico
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <MdLogout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        }
      </Menu>
    </React.Fragment>
  );
}