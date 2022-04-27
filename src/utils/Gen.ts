import { faker } from '@faker-js/faker';
import { RepoConfig } from '../config/RepoConfig';

export const genNumber = (min?: number, max?: number): number => faker.datatype.number({ min, max });

export const genLongitude = (): string => faker.address.longitude()

export const genLattitude = (): string => faker.address.longitude()

export const genAlphaNumeric = (length = 32): string => faker.random.alphaNumeric(length);

export const genSample = <A>(items: A[]): A => items[Math.floor(Math.random() * items.length)];

export const geRepoConfig = ():RepoConfig => ({
    database: genAlphaNumeric(),
    port: genNumber(),
    host: genAlphaNumeric(),
    user: genAlphaNumeric(),
    password: genAlphaNumeric(),
})