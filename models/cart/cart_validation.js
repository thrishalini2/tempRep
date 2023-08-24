const z = require('zod');

const cartSchema = z.object({
  userId: z.string(),
  itemId: z.string(),
  quantity: z.number().int().positive(),
});

module.exports = cartSchema;
