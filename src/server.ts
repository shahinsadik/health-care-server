import { log } from 'console';


import app from './app';
import { Server } from 'http';
const port = 3000;

async function main() {
    const server: Server = app.listen(port, () => {
        log(`Health Care Server is running on port ${port}`);
    })
}
main();