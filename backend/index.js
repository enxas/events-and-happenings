import 'dotenv/config'

import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './config/dbConnetion.js'
import corsOptions from './config/corsOptions.js'
import credentials from './middleware/credentials.js'

import registerRoute from './routes/register.js'
import loginRoute from './routes/login.js'
import refreshRoute from './routes/refresh.js'
import logoutRoute from './routes/logout.js'
import happeningRoute from './routes/happening.js'
import userRoute from './routes/user.js'

import swaggerDocs from './swagger.js'

const __dirname = import.meta.dirname

const app = express()
const PORT = process.env.PORT || 3500

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware to handle json data
app.use(express.json())

// middleware to handle cookies
app.use(cookieParser())

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')))

// routes
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/logout', logoutRoute)
app.use('/refresh', refreshRoute)
app.use('/events', happeningRoute)
app.use('/users', userRoute)

// connect to database
connectDB(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	swaggerDocs(app, PORT)
})
