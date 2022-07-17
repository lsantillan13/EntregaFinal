/*asd*/
const config = {
  mongoDB: {
    URL: process.env.MONGO_URI,
    options:  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeOutMS: 5000,
    }
  },
  firebase : {
    products: {collection: 'Productos'},
    cart: {collection: 'Carts'}
  },
  archivo:{
    URL: './data/productos.txt'
  },
  memoria:{
    products: {filename: './data/memory.txt'},
    cart: {filename: './data/cart.txt'}

  },
  Sqlite:{
    client: 'sqlite3',
    connection: {filename: './db/sqlite/db/mydb.sqlite'},
    useNullAsDefault: true,
  }
};

module.exports = config;