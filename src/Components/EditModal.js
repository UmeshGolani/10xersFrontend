import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditModal = ({ open, handleClose, product, handleSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleSave(editedProduct);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Product Name"
          type="text"
          fullWidth
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
