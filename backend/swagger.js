import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Events & Happenings API',
			description: "API endpoints for events and happenings services documented on swagger",
			version: '1.0.0',
		}
	},
	// looks for configuration in specified directories
	apis: ['./docs/routes/*.yaml'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
	// Swagger Page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	// Documentation in JSON format
	app.get('/docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpec)
	})
}
export default swaggerDocs