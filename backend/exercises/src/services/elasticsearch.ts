import { Client } from "@elastic/elasticsearch";
import { SearchOptions } from "../controllers/excersies.controller";
import { WildcardSearch } from "./exercises";

class ElasticSearchService {
    private readonly _client;

    constructor() {
        console.log(process.env.ELASTIC_URL)
        this._client = new Client({ 
            node: process.env.ELASTIC_URL,
            maxRetries: 5,
            requestTimeout: 60000,
            sniffOnStart: true
        });
    }

    async createIndex() {
        try {
            await this._client.indices.create({ 
                index: process.env.ELASTIC_INDEX!,
                // body: {
                //     settings: {
                //         analysis: {
                //             analyzer: {
                //                 custom_analyzer: {
                //                     type: "custom",
                //                     tokenizer: "standard",
                //                     filter: ["lowercase", "substring", "whitespace"]
                //                 }
                //             },
                //             filter: {
                //                 substring: {
                //                   type: "ngram",
                //                   min_gram: 2,
                //                   max_gram: 15
                //                 }
                //               }
                //         }
                //     }
                // },
                // mappings: {
                //     properties: {
                //         name: { type: 'text', analyzer: 'custom_analyzer'},
                //     }
                // }
            });
            console.log(`Created index ${process.env.ELASTIC_INDEX!}`);
        } catch(e) {
            console.error(`An error occurred while creating the index ${process.env.ELASTIC_INDEX!}:`);
            console.error(e);
        }
    }

    checkConnection() {
        return new Promise(async (resolve) => {
          console.log("Checking connection to ElasticSearch...");
          let isConnected = false;
          while (!isConnected) {
            try {
              await this._client.cluster.health({});
              console.log("Successfully connected to ElasticSearch");
              isConnected = true;
            } catch (e) {
                // console.error(e);
            }
          }
          resolve(true);
        });
    }


    async addExcercise(excersie: any) {
        try {
            await this._client.index({
                index: process.env.ELASTIC_INDEX!,
                body: {
                    ...excersie
                }
            })
        } catch (e) {
            console.error(e);
        }
    }

    async refreshIndices() {
        await this._client.indices.refresh({ index: process.env.ELASTIC_INDEX! })
    }

    async search(mappings:any, from: number) {
        console.log(JSON.stringify(mappings))
        const body  = await this._client.search({
            index: process.env.ELASTIC_INDEX!,
            body: { 
                ...mappings
            }
          });

          return body.hits.hits
          .map(item => item._source)
    }

    async cleanData() {
        await this._client.indices.delete({ index: process.env.ELASTIC_INDEX!});
    }
}

const searchService = new ElasticSearchService();
export default searchService;