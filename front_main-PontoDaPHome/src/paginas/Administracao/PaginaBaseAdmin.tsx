import { AppBar, Box, Button, Typography, Container, Toolbar, Link, Paper } from "@mui/material";
import { Outlet, Link as RouterLink } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';

const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, mx: 3, color: "white" }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, mx: 3, color: "white" }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ my: 2, mx: 3, color: "white" }}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ my: 2, mx: 3, color: "white" }}>
                                    Novo Prato
                                </Button>
                            </Link>
                            {/* <Link component={RouterLink} to="/">
                                <Button sx={{ my: 2, mx: 3, color: "white" }}>
                                    <HomeIcon></HomeIcon>
                                </Button>
                            </Link> */}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        {/* Aqui vai o conteúdo */}
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin;