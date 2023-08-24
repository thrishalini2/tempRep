const z = require('zod');

const productsSchema = z.object({
  title: z.string().min(1).max(100).required('Title is required'),
  description: z.string().min(1).max(500).required('Description is required'),
  price: z.number().positive().required('Price is required'),
  tax: z.number().positive(),
  imageLink: z.string().url().required('Image link is required'),
  stock: z.number().int().positive().required('Stock is required'),
  available: z.number().int().positive().required('Available quantity is required'),
  toBeDispatched: z.number().int().positive().required('To be dispatched quantity is required'),
  type: z.string().min(1).max(1).required('Type is required'),
});

module.exports = productsSchema;
