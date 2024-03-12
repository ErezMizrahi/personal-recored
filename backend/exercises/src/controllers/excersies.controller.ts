import searchService from "../services/elasticsearch";
import excersiesService from "../services/exercises";
import { Request, Response } from "express";
import { SearchOptions } from "../utils/types/searchOptions.type";

export const load = async (req: Request, res: Response) => {
    await excersiesService.loadFromJson();
    res.status(200).send();
}

export const cleanDb = async (req: Request, res: Response) => {
    await searchService.cleanData();
    res.status(200).send();
}

export const search = async (req: Request<SearchOptions>, res: Response) => {
    const filters = req.query;
    const excersies = await excersiesService.search(filters);
    res.status(200).send(excersies);
}

