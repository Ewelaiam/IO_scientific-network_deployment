import { University } from "./University";


export type NetworkUser = {
    FirstName: string;
    LastName: string;
    Title?: string;
    ImageLink?: string;
    Universities: University[];
}