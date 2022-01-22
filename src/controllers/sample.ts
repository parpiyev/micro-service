import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

export class SampleController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        storage.sample.find(req.query).then(
            (sample) => {
                res.status(200).json({
                    success: true,
                    data: {
                        sample
                    }
                })
            })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        storage.sample.findOne({ _id: req.params.id }).then(
            (sample) => {
                if (sample) {
                    res.status(200).json({
                        success: true,
                        data: {
                            sample
                        }
                    })
                } else {
                    logger.warn(`$storage.sample.get failed to findOne`)
                    return next(new AppError(404, "Sample is not found"))
                }
            })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        storage.sample.create(req.body).then(
            (sample) => {
                res.status(201).json({
                    success: true,
                    data: {
                        sample
                    }
                })
            })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        storage.sample.update(req.params.id, req.body).then(
            (sample) => {
                if (sample) {
                    res.status(200).json({
                        success: true,
                        data: {
                            sample
                        }
                    })
                } else {
                    logger.warn(`$storage.sample.get failed to findOneAndUpdate`)
                    return next(new AppError(404, "Sample is not found"))
                }
            })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.sample.delete(req.params.id)

        storage.sample.find(req.query).then(
            (sample) => {
                res.status(200).json({
                    success: true,
                    data: {
                        sample
                    }
                })
            })
    })
}
