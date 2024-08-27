"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Typography, TextField, InputAdornment, Menu, MenuItem, Avatar } from '@mui/material';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config'; // Import db to fetch user data
import { doc, getDoc } from 'firebase/firestore';

const pages = ['Home', 'Near Me', 'Plans', 'About'];

interface NavbarProps {
  showSearch?: boolean;
  onOpenModal: () => void; // Add prop for opening the modal
}

const Navbar: React.FC<NavbarProps> = ({ showSearch = false, onOpenModal }) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [activePage, setActivePage] = React.useState<string | null>(null);
  const [searchVisible, setSearchVisible] = React.useState(false); // State for search bar visibility
  const searchRef = useRef<HTMLDivElement | null>(null); // Ref for search bar container
  const [user, loading] = useAuthState(auth); // Firebase authentication state
  const [userProfileImage, setUserProfileImage] = useState<string | undefined>(undefined); // State for user profile image URL
  const router = useRouter();
  
  // State for menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      if (user) {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserProfileImage(userData?.photoURL || '/image.png');
          }
        } catch (error) {
          console.error('Error fetching user profile image:', error);
          setUserProfileImage('/image.png'); // Fallback to default image
        }
      }
    };

    fetchUserProfileImage();
  }, [user]);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    const path = page === 'Home' ? '/' : `/${page.replace(' ', '-')}`;
    router.push(path);
    handleCloseDrawer();
  };

  const handleToggleSearch = () => {
    setSearchVisible(prev => !prev);
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchBarStyles = {
    backgroundColor: 'white',
    borderRadius: 1,
    width: { xs: '100%', md: '200px' }, // Responsive width
    marginTop: { xs: '8px', md: 0 },
    marginRight: { xs: '0', md: '16px' }, // Add gap on large screens
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent', // Remove border color
      },
      '&:hover fieldset': {
        borderColor: 'transparent', // Remove border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent', // Remove border color when focused
      },
    },
    '& input': {
      padding: '8px', // Adjust padding as needed
    },
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
              fontSize: '1rem',
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
              aria-label={openDrawer ? 'close menu' : 'open menu'}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openDrawer ? handleCloseDrawer : handleOpenDrawer}
              color="inherit"
            >
              {openDrawer ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* Drawer Component */}
            <Drawer
              anchor="left"
              open={openDrawer}
              onClose={handleCloseDrawer}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 250,
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <IconButton onClick={handleCloseDrawer} color="inherit">
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    sx={{
                      my: 1,
                      color: 'white',
                      textAlign: 'left',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                        color: 'black',
                      },
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Drawer>
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
              fontSize: '1.2rem',
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
                    backgroundColor: '#f0f0f0',
                    color: 'black',
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Conditionally Render Search Bar for Desktop */}
          {showSearch && (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
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
                sx={searchBarStyles}
              />
            </Box>
          )}

          {/* Conditionally Render Search Icon and Bar for Mobile */}
          {showSearch && (
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="search"
                aria-controls="search-appbar"
                aria-haspopup="true"
                onClick={handleToggleSearch}
                color="inherit"
              >
                <SearchIcon />
              </IconButton>

              {/* Search Bar for Small Devices */}
              {searchVisible && (
                <Box
                  ref={searchRef} // Attach ref here
                  sx={{ position: 'absolute', top: '64px', left: 0, right: 0, backgroundColor: 'transparent', p: 2 }}
                >
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
                    sx={searchBarStyles}
                  />
                </Box>
              )}
            </Box>
          )}

          {/* Conditionally Render Profile Icon with Dropdown */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="user profile"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    src={userProfileImage || '/image.png'} // Use fallback image if null
                    alt="User Profile"
                    sx={{ width: 35, height: 35 }}
                  />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      width: 200,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    },
                  }}
                >
                  <MenuItem onClick={() => {
                    router.push('/User-profile');
                    handleMenuClose();
                  }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mr: 1,
                  color: 'black',
                  backgroundColor: '#adacac',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  padding: '4px 8px',
                  height: '36px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  } 
                }}
                onClick={onOpenModal} // Use the callback to open modal
              >
                Get Started
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
