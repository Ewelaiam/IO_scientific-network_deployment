export type ProfileData = {
    userId?: number;
    email?: string;
    name?: string;
    surname?: string;
    imageUrl?: string;
    organisations: Organisation[];
};

type Organisation = {
    id: Number,
    isVerified: boolean,
    name: string,
    mailTemplate: string
}
