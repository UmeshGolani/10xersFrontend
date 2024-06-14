import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../Redux/Actions/productActions';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import ProductDetailsModal from './ProductDetailsModal';

const Customer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Determine the products to display on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <Container sx={{ marginTop: '80px' }}>
            <Grid container spacing={3}>
                {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card onClick={() => handleOpenModal(product)}>
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>${product.price}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {products.length > productsPerPage && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Grid container spacing={2} justifyContent="center">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Grid item key={index}>
                                <Button
                                    variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            <ProductDetailsModal 
                open={modalOpen} 
                handleClose={handleCloseModal} 
                product={selectedProduct} 
            />
        </Container>
    );
};

export default Customer;
