import 'dotenv/config'
import { App } from './src/models/App.js'

const server = new App();

server.listen();