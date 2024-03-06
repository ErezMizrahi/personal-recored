import searchService from "../services/elasticsearch";
import excersiesService, { SearchByOptions } from "../services/exercises";
import { Request, Response } from "express";

export const load = async (req: Request, res: Response) => {
    await excersiesService.loadFromJson();
    res.status(200).send();
}

export const cleanDb = async (req: Request, res: Response) => {
    await searchService.cleanData();
    res.status(200).send();
}

export const searchByName = async (req: Request, res: Response) => {
    const by = req.params.by as SearchByOptions;
    const query = req.query.query as string;
    const from = req.query.from as string;
    console.log('by', by, 'from', from)
    
    const excersies = await excersiesService.search(by, query, from);
    res.status(200).send(excersies);
}