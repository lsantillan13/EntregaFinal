if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
/*================== // ==================*/ // Server
const { createRoles } = require('./libs/initialSetup.js');

const express = require('express');
const path = require('path');


const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
/*================== // ==================*/ // CLUSTER || FORK
//const cluster = require('cluster');
//const numCPUs = require('os').cpus().length;

// if (cluster.isMaster){
//   console.log('num cpus:', numCPUs);

//   for( let index = 0; index < numCPUs; index++){
//     cluster.fork();
//   }
//   cluster.on('exit', worker=>(
//     console.log(`Worker ${process.pid} ended ${new Date().toLocaleString()}`)

//   ));
// }
/*================== // ==================*/ // Initialization
const app = express();
createRoles();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
/*================== // ==================*/ // Libraries / etc
const exphbs = require('express-handlebars');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
/*===== // =====*/ // Messages model
//const { Sqlite } = require('./utils/config');
//const messagesTable = 'messages';
/*================== // ==================*/ // Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 8);
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
/*----- Session -----*/
app.use(session({
  secret: 'terces',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 0 // 20 seg
  }
}));
/*================== // ==================*/ // Engines - Utils
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsdir: path.join(app.get('views'), 'partials'),
    helpers: {
      section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    }
  })
);
app.set('view engine', 'hbs');
/*================== // ==================*/ // Routes
const productsRoutes = require('./Router/products.routes.js');
const userRoutes = require('./Router/userRoutes.routes.js');
//============ API Routes ===========// // API

app.use('/api', productsRoutes);
app.use('/api', userRoutes);
app.get('/formulario');
//=========  Client Routes  =========// // API
/*                                   */
// res.render('home');
app.get('/', (req, res) => { res.render('home');});

app.use('/home', (req, res) => { res.render('home'); });

app.get('/account/login', ( req, res) => { res.render('login'); });

app.get('/login-error', (req, res) => { res.render('login-error'); });

app.get('/account/register', (req, res) => { res.render('register'); });

//============ Socket IO ============//
io.on('connection', (socket) =>{

  socket.on('products:send', (data) => { // => Recibo producto
    io.sockets.emit('products:send', data); // => Devuelvo producto
  });

  socket.on('chat:message', (data) => { // => Recibo el Mensaje
    // Message.saveMessage(data);
    io.sockets.emit('chat:message', data); // => Devuelvo el Mensaje
  });

  /*Messages*/
  socket.on('chat:typing', (data) => { // => Recibo el usuario
    socket.broadcast.emit('chat:typing', data); // => Devuelvo el usuario
  });
  
});

//=============================================================== Clase 26  ===============================================================*/
/*Process*/
app.get('/info', (req, res) => {
  res.send(`
  <div class="info">
  <h3> Información del Proyecto </h3>
  <label>Argumentos de entrada</label>                                <input value=${process.argv} readonly "/>
  <br>
  <label>SO</label>:                                                  <input value=${process.platform} readonly/>
  <br>
  <label>Version de Node.js</label>                                   <input value=${process.version} readonly/>
  <br>
  <label>Memoria total reservada</label>                              <input value=${process.memoryUsage.rss()} readonly/>
  <br>
  <label>Path de ejecución</label>                                    <input value=${process.execPath} readonly/>
  <br>
  <label>Process ID</label>                                           <input value=${process.pid} readonly/>
  <br>
  <label>Carpeta del proyecto</label>                                 <input value=${process.cwd()} readonly style="width: 20%;"/>
  <br>
  </div>
  `);
});

//--------------------------------- Server ---------------------------------//
const server = httpServer.listen(app.get('port'), () => { console.log('Server on port', app.get('port')); });
server.on('error',error => { console.log('Error en el servidor', error); });

