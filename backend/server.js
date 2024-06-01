const app = require('./app')

const PORT = process.env.API_PORT

// app.use(cookieParser(secret))
// app.use(bodyParser.json())
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// )
// app.use(cors())

app.listen(PORT, () => console.log(`\nListening on ${PORT}`))
