import { faker } from '@faker-js/faker';

export const genLongitude = (): string => faker.address.longitude()

export const genLattitude = (): string => faker.address.longitude()

export const genAlphaNumeric = (length = 32): string => faker.random.alphaNumeric(length);
