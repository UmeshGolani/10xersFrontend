// components/ProductDetailsModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ProductDetailsModal = ({ open, handleClose, product }) => {
    if (!product) return null;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                border: '2px solid #000', 
                boxShadow: 24, 
                p: 4 
            }}>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Typography variant="body2">${product.price}</Typography>
                <Button variant="contained" onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    );
};

export default ProductDetailsModal;
