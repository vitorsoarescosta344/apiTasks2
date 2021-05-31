const express = require("express");

const PORT = process.env.PORT || 5000

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();

    this.express.listen(PORT, () =>
      console.log(`Sua API REST está funcionando na porta ${PORT} `)
    );
  }


  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./src/routes"));
  }
}
module.exports = new App().express;