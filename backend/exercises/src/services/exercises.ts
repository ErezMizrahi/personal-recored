import fs from 'fs/promises';
import path from 'path';
import searchService from './elasticsearch';

export enum SearchByOptions {
    name = 'name',
    level= 'level',
    category= 'category'
}

class ExercisesService {
    async loadFromJson() {
        const excersiesJson = JSON.parse( await fs.readFile(path.resolve('src/services/data/exercises.json'), 'utf-8') );
        for(const exercise of excersiesJson.exercises) {
            await searchService.addExcercise(exercise);
            console.log(`saved exercise name: ${exercise.name}`);
        }
        
        console.log('done');
    }

    async search(by: SearchByOptions, query: string, from: string) {
        const fromNumber = parseInt(from);
        return await searchService.search(by, query, fromNumber);
    }
 }

const excersiesService = new ExercisesService();
export default excersiesService;