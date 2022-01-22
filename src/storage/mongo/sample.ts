import { SampleRepo } from "../repo/sample"
import Sample, { ISample } from "../../models/Sample"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class SampleStorage implements SampleRepo {
    private scope = "storage.sample"

    async find(query: Object): Promise<ISample[]> {
        try {
            return await Sample.find(query)
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<ISample> {
        try {
            return await Sample.findOne(query) as ISample
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: ISample): Promise<ISample> {
        try {
            return await Sample.create(payload)
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: ISample): Promise<ISample> {
        try {
            return await Sample.findOneAndUpdate(query, payload, { new: true }) as ISample
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<any> {
        try {
            const sample = await Sample.findOneAndDelete(query)

            if (!sample) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, "Sample is not found")
            }

            return sample
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
