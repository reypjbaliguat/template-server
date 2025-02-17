import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './graphql/schema.js';
import { context } from './graphql/context.js';

const yoga = createYoga({
    schema,
    context,
    maskedErrors: false, // Ensure error details are not masked
    formatError: (err) => {
        // Custom error formatting
        return {
            message: err.message || 'An unexpected error occurred',
            locations: err.locations,
            path: err.path,
        };
    },
});
const server = createServer(yoga);

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
