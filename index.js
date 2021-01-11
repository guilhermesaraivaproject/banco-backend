const app = require('express')()
const db = require('./config/db')
const consign = require('consign')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API',
            description: 'API Banco',
            contact: {
                name: "Eu"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['api/*.js']
}

// Routes

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

consign().include('./config/passport.js').then('./config/middlewares.js').then('./api').then('./config/routes.js').into(app)

app.db = db

app.listen(3000, () => {
    console.log('Backend executando...')
})