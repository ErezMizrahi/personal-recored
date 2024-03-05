import { Client } from "@elastic/elasticsearch";
import { SearchByOptions } from "./exercises";

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
            await this._client.indices.create({ index: process.env.ELASTIC_INDEX! });
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

    async search(by: SearchByOptions, query: string) {
        console.log({[by]: query})
        const body  = await this._client.search({
            index: process.env.ELASTIC_INDEX!,
            body: {
                sort: ["_score"],
                query: {
                    bool: {
                        must: [
                            {
                                match: {
                                    [by]: query 
                                }
                            },
                            {
                                match: {
                                    force: 'push' 
                                }
                            }
                        ]
                    }
                }
            }
          })
          console.log(body.hits.hits)
    }
}

const searchService = new ElasticSearchService();
export default searchService;