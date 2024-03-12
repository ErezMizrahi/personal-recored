import fs from 'fs/promises';
import path from 'path';
import searchService from './elasticsearch';
import { SearchOptions } from '../utils/types/searchOptions.type';
import { FILTERS } from '../utils/constants';
import { SearchHit, SearchResponse, SearchTotalHits } from '@elastic/elasticsearch/api/types';

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
        const queryFilters = Object.entries(filters)
        .filter(([key, _]) => !FILTERS.IGNORED_FILTERS.includes(key))
        .map(([key, value]) => `${key}:${value}`)
        .join(' AND ');

        const body = {
            sort: ["_score"],
            size: 10,
            from: filters.from!,
            query: {
                bool: {
                    must: [
                        {
                            match_phrase_prefix: {
                                name: filters.name
                            }
                        },
                        {
                            query_string: {
                                query: queryFilters || "*"
                            }
                        }
                    ]
                }
            }
        };

        const results =  (await searchService.search(body)).body as SearchResponse;
        return this.buildSearchResponse(results);
    }

    private buildSearchResponse(result: SearchResponse) {
        const { value } = result.hits.total as SearchTotalHits;
        
        return {
            metadata: {
                total: value,
                max_score: result.hits.max_score
            },
            data: result.hits.hits.map((item: SearchHit) => item._source)
        }
    }
 }

const excersiesService = new ExercisesService();
export default excersiesService;


