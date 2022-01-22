import { logger } from "./config/logger"
import DB from "./core/db"
import './routes/sample'

    ; (async function () {
        try {
            const db = new DB()
            db.connect()

            logger.info("INDEX: Database connection initialized.")
        } catch (e) {
            throw new Error(`DB connection error: ${e}`)
        }
    })()