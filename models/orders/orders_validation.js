const z = require('zod');

const orderSchema = z.object({
  userId: z.string().optional(), 
  itemId: z.string().required(), 
  quantity: z.number().int().positive().required(),
  paymentId: z.string().optional(),
});

module.exports = orderSchema;
