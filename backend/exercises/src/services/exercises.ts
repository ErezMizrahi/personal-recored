import fs from 'fs/promises';
import path from 'path';
import searchService from './elasticsearch';
import { SearchOptions } from '../controllers/excersies.controller';

class ExercisesService {
    async loadFromJson() {
        const excersiesJson = JSON.parse( await fs.readFile(path.resolve('src/services/data/exercises.json'), 'utf-8') );
        for(const exercise of excersiesJson.exercises) {
            await searchService.addExcercise(exercise);
            console.log(`saved exercise name: ${exercise.name}`);
        }
        
        console.log('done');
    }

    async search(filters: SearchOptions) {
        const queryString = Object.entries(filters)
        .filter(([key, _]) => key !== 'from')
        .map(([key, value]) => {
            if(key === 'name') {
                return `${key}:"${value.split(' ').join('*')}"`;
            }
            return `${key}:${value}`;
        })
        .join(' AND ');

        const body = {
            sort: ["_score"],
            size: 10,
            from: filters.from!,
            query: {
                query_string: {
                    query: queryString
                }
            }
        };

        return await searchService.search(body, filters.from!);
    }
 }

const excersiesService = new ExercisesService();
export default excersiesService;


export interface WildcardSearch { 
    wildcard : {
        [x:string]: { value : any, 'case_insensitive': boolean }
    }
}