import { NetworkUser } from "./NetworkUser";
import { University } from "./University"

export type NetworkAPI = {
    MyUniversities: University[];
    Users: NetworkUser[];
}