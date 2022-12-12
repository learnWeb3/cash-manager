import { ReactElement, useState } from 'react';
import { Toolbar, IconButton, AppBar, Box, Drawer } from '@mui/material';
import { Group, Menu, Inventory, Dashboard } from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationIcon {
    active: string;
    path: string;
    icon: ReactElement;
};

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const container = window.document.body;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navlist: NavigationIcon[] = [
        {
            active: '/dashboard',
            path: '/dashboard',
            icon: <Dashboard />
        }, 
        {
            active: '/users',
            path: '/users',
            icon: <Group />
        }, 
        {
            active: '/stocks',
            path: '/stocks',
            icon: <Inventory />
        }
    ];

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const drawerWidth = 90;

    const drawer = (
        <div>
            <Toolbar>
                <div style={{display: 'flex', justifyContent: 'center', height: '10vh', width: `${drawerWidth}px`}}>
                    <h1>CM</h1>
                </div>
            </Toolbar>
            <div  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',  height: "85vh"}} >
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    {navlist.map(({active, path, icon}, idx) => (
                        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', width: `${drawerWidth}px`, height: "80px", marginTop: '30px'}} key={idx}>
                            <IconButton
                                color={location.pathname.startsWith(active) ? "primary" : "inherit"}
                                onClick={() => navigate(path)}
                            >
                                {icon}
                            </IconButton>
                        </div>                
                    ))}
                </div>
            </div>
  
        </div>
    );


    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    background: 'white'
                }}
            >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' }}}
                >
                    <Menu color='disabled' />
                </IconButton>
            </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ 
                    width: { sm: drawerWidth }, 
                    flexShrink: { sm: 0 } 
                }}
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    open
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}

export default Navbar;