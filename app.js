const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./docs/swagger")

const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/auth", require("./routes/auth.routes"))
app.use("/records", require("./routes/record.routes"))
app.use("/dashboard", require("./routes/dashboard.routes"))
app.use("/users", require("./routes/user.routes"))

module.exports = app