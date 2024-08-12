"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { MenuItem, Typography, TextField, InputAdornment } from '@mui/material';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';

const pages = ['Home', 'Near Me', 'Plans', 'About'];
const settings = ['Profile', 'Account', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElSearch, setAnchorElSearch] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = React.useState<string | null>(null);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenSearchMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseSearchMenu = () => {
    setAnchorElSearch(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    const path = page === 'Home' ? '/' : `/${page.replace(' ', '-')}`;
    router.push(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        zIndex: 1201,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for Desktop View */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Image src="/Logo.png" alt="Logo" width={35} height={35} onClick={() => handlePageChange('Home')} style={{ cursor: 'pointer' }} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1rem', // Adjust font size
            }}
            onClick={() => handlePageChange('Home')}
            style={{ cursor: 'pointer' }}
          >
            FitExis
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => handlePageChange(page)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f0f0', // Off-white background on hover
                      color: 'black', // Black text color on hover
                    }
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      color: activePage === page ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for Mobile View */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Image src="/Logo.png" alt="Logo" width={35} height={35} onClick={() => handlePageChange('Home')} style={{ cursor: 'pointer' }} />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.2rem', // Adjust font size
            }}
            onClick={() => handlePageChange('Home')}
            style={{ cursor: 'pointer' }}
          >
            FitExis
          </Typography>

          {/* Nav Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                sx={{
                  my: 2,
                  color: activePage === page ? 'primary.main' : 'white',
                  display: 'block',
                  mx: 1.5,
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Off-white background on hover
                    color: 'black', // Black text color on hover
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Search Bar for Large Devices */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                width: '200px', // Fixed width for larger devices
              }}
            />
          </Box>

          {/* Search Icon for Small Devices */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center', mr: 1 }}>
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              onClick={handleOpenSearchMenu}
            >
              <SearchIcon />
            </IconButton>
            <Menu
              id="search-menu"
              anchorEl={anchorElSearch}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElSearch)}
              onClose={handleCloseSearchMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  overflow: 'visible', // Ensure overflow is handled properly
                },
              }}
            >
              <MenuItem onClick={handleCloseSearchMenu} sx={{ padding: 0 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    width: '200px', // Fixed width for dropdown search bar
                    margin: '10px', // Margin to ensure it is not clipped
                  }}
                />
              </MenuItem>
            </Menu>
          </Box>

          {/* Get Started Button */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mr: 1,
                color: 'black',
                backgroundColor: '#adacac',
                fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Adjust font size based on screen size
                padding: '4px 8px', // Adjust padding for smaller button
                height: '36px', // Adjust height for better fit
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                }
              }}
              onClick={() => router.push('/login')}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
