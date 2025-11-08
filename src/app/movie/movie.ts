import { Director } from "../director/director";
import { Actor } from "../actor/actor";
import { Genre } from "../genre/genre";

export interface YoutubeTrailer {
    id: string;
    name: string;
    url: string;
    duration: number;
    channel: string;
}

export class Movie {
    id!: string;
    title!: string;
    poster!: string;
    duration!: number;
    country!: string;
    releaseDate!: Date | string;
    popularity!: number;
    director?: Director;
    actors?: Actor[];
    genre?: Genre;
    platforms?: any[];
    reviews?: any[];
    youtubeTrailer?: YoutubeTrailer;
}


