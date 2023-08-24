const z = require('zod');

const servicesSchema = z.object({
  title: z.string().min(1).max(100).required(),
  description: z.string().min(1).max(500).required(),
  pricePerHour: z.number().positive().required(),
  hours: z.number().int().positive().required(),
  tax: z.number().positive(),
  imageLink: z.string().url().required(),
  stock: z.number().int().positive().required(),
  available: z.number().int().positive().required(),
  toBeDispatched: z.number().int().positive().required(),
  type: z.string().min(1).max(1).required(),
});

module.exports = servicesSchema;
