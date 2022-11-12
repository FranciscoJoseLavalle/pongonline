import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`))
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('game');
});

io.on('connection', async socket => {
    console.log('Socket connected');
    // socket.broadcast.emit('newUser')

    socket.on('movement', async (data) => {
        socket.broadcast.emit('movement', data);
    })
    socket.on('connected', async (data) => {
        socket.broadcast.emit('connected', data);
    })
    // socket.on('userConnected', async (data) => {
    //     let archivo = await newFile.getAll();
    //     await io.emit('log', archivo);

    //     let product = await newProduct.getAll();
    //     await io.emit('sendProduct', product)
    // })
})