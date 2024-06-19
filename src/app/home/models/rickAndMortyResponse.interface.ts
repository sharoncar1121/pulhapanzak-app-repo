import { characterDto } from "./characterDto.interface";

export interface rickAndMortyResponse {
    count: number;
    next: string;
    previous: string;
    results: characterDto[]
}