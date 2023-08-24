const z = require('zod');

const userSchema = z.object({
  name: z.string().min(1).max(100).required,
  phoneNumber: z.string().min(10).max(13).required,
  email: z.string().email('Invalid email format').required,
  password: z.string().min(5).required,
  address: z.string().min(1).max(500),
  paymentId: z.string().optional,
});

module.exports = userSchema;
