const Hapi = require('@hapi/hapi');
const host = "localhost";
const port = 3000;
const server = Hapi.server({
    port: port,
    host: host,
    routes: {
        cors: {
            origin: ['*'], 
            headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'], 
            exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'], 
            additionalExposedHeaders: ['Accept'], 
            maxAge: 60,
            credentials: true 
        },
        validate: {
            failAction: async (req, res, err) => {
                return err
            },
            options: {
                abortEarly: false
            }
        }
    }
});

module.exports = server;