import rateLimit from 'express-rate-limit';


const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests. Please try again later.',
  },
  headers: true, // Include rate limit info in response headers
});

export default rateLimiter;
