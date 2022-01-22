import { SampleStorage } from "./mongo/sample"

interface IStorage {
    sample: SampleStorage
}

export const storage: IStorage = {
    sample: new SampleStorage()
}
