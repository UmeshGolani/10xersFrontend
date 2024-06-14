import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../Redux/Actions/productActions';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Modal, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import ProductDetailsModal from '../Components/ProductDetailsModal';

const Admin = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);
    const admin_id = sessionStorage.getItem("admin_id"); // Replace with actual admin_id logic

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0.0
    });
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        dispatch(getAllProducts(admin_id));
    }, [dispatch, admin_id]);

    const handleCreateProduct = () => {
        if (!formData.name || !formData.description || formData.price <= 0) {
            setFormError('Please fill out all fields correctly.');
            return;
        }

        const newProduct = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            admin_id // Include admin_id in new product
        };
        dispatch(createProduct(newProduct));
        setModalOpen(false);
        setFormData({
            name: '',
            description: '',
            price: 0.0
        });
    };

    const handleUpdateProduct = () => {
        if (!formData.name || !formData.description || formData.price <= 0) {
            setFormError('Please fill out all fields correctly.');
            return;
        }

        const updatedProduct = {
            _id: selectedProduct._id,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            admin_id // Include admin_id in updated product
        };
        dispatch(updateProduct(updatedProduct));
        setModalOpen(false);
        setFormData({
            name: '',
            description: '',
            price: 0.0
        });
    };

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
        setModalOpen(false);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setModalMode('edit');
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price
        });
        setModalOpen(true);
    };

    const handleOpenCreateModal = () => {
        setModalMode('create');
        setFormData({
            name: '',
            description: '',
            price: 0.0
        });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
        setFormError(null);
    };

    return (
        <Container sx={{ marginTop: '40px' }}>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card onClick={() => handleOpenModal(product)}>
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>${product.price}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenModal(product);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteProduct(product._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for editing or creating product */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: '400px' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalMode === 'edit' ? 'Edit Product' : 'Create New Product'}
                    </Typography>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input
                            id="description"
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </FormControl>
                    {formError && (
                        <FormHelperText sx={{ color: 'red', mt: 2 }}>{formError}</FormHelperText>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={modalMode === 'edit' ? handleUpdateProduct : handleCreateProduct}
                        >
                            {modalMode === 'edit' ? 'Update' : 'Create'}
                        </Button>
                        <Button variant="contained" onClick={handleCloseModal}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default Admin;
