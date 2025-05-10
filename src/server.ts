import { log } from 'console';


import app from './app';
import { Server } from 'http';
import config from './config';


const port = config.port;

async function main() {
    const server: Server = app.listen(port, () => {
        log(`Health Care Server is running on port ${port}`);
    })
}
main();