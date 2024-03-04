import excersiesService, { SearchByOptions } from "../services/exercises";
import { Request, Response } from "express";

export const load = async (req: Request, res: Response) => {
    await excersiesService.loadFromJson();
    res.status(200).send();
}

export const cleanDb = async (req: Request, res: Response) => {
    await excersiesService.cleanDb();
    res.status(200).send();
}

export const searchByName = async (req: Request, res: Response) => {
    const by = req.params.by as SearchByOptions;
    console.log('by', by)
    const query = req.query.query as string;
    const excersies = await excersiesService.search(by, query);
    res.status(200).send(excersies);
}