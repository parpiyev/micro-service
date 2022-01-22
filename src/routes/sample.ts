import cors from "cors"
import express, { Router, Request, Response } from "express"
import { expressLogger, logger } from "../config/logger"
import { SampleController } from "../controllers/sample"
import { SampleValidator } from "../validators/sample"
import { ErrorController } from "../controllers/error"
import config from "../config/config"

const app = express()

const errorController = new ErrorController()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLogger())

app.get("/status", (req: Request, res: Response) => {
    res.json({
        stauts: "OK"
    })
}
)
const router = Router({ mergeParams: true })
const controller = new SampleController()
const validator = new SampleValidator()

router.route("/all").get(controller.getAll)
router.route("/create").post(validator.create, controller.create)
router
    .route("/:id")
    .get(controller.getOne)
    .patch(validator.update, controller.update)
    .delete(controller.delete)

app.use('/sample', router)

app.use(errorController.hanle)

    ; (async function () {
        app.listen(config.HttpPort, () => {
            logger.info(`INDEX: Sample is running on port: ${config.HttpPort}`)
        })
    })()