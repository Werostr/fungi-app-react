import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LooksIcon from "@mui/icons-material/Looks";

export default function Navbar({ logout, token }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    logout();
    navigate("/");
  };

  return (
    <AppBar sx={{ backgroundColor: "#ff6d75" }} position="sticky">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <LooksIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Fungi Elysium
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key="all"
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/fungi`);
                }}
              >
                <Typography textAlign="center">All fungi</Typography>
              </MenuItem>
              <MenuItem
                key="new"
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/fungi/new`);
                }}
              >
                <Typography textAlign="center">Create new</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <LooksIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Fungi Elysium
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="all"
              onClick={() => {
                navigate(`/fungi`);
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              All fungi
            </Button>
            <Button
              key="create"
              onClick={() => {
                navigate(`/fungi/new`);
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create new
            </Button>
          </Box>
          {token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="That's You">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="fungi" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Your fungi</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/login`);
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/register`);
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
