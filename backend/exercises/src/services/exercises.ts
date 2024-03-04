import fs from 'fs/promises';
import path from 'path';
import { Exercise } from '../models/excersie.model';

export enum SearchByOptions {
    name = 'name',
    level= 'level',
    category= 'category'
}

class ExercisesService {
    async loadFromJson() {
        const excersiesJson = JSON.parse( await fs.readFile(path.resolve('src/services/data/exercises.json'), 'utf-8') );
        
        for(const exercise of excersiesJson.exercises) {
            if(!await this.isExerciseExist(exercise.name)) {
                const exer = await Exercise.build(exercise);
                exer.save();
                console.log(`saved exercise name: ${exercise.name}`);
            } else {
                console.log(`exercise name: ${exercise.name} already exists`);

            }
        }
        
        console.log('done');
    }

    private async isExerciseExist(name: string): Promise<boolean> {
        const exercise = await Exercise.findOne({name});
        return exercise != undefined;
    }

    async cleanDb() {
        await Exercise.deleteMany({});
    }

    async search(by: SearchByOptions, query: string) {
        const excersies = await Exercise.find({
            $or: [
                {[by]: { $regex: `^${query}`, $options: 'i'} }
            ]
        });

        return excersies;
    }
 }

const excersiesService = new ExercisesService();
export default excersiesService;