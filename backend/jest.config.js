/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/src/$1'],
    '@config': ['<rootDir>/src/config'],
    '@dtos/(.*)': ['<rootDir>/src/dtos/$1'],
    '@entities/(.*)': ['<rootDir>/src/entities/$1'],
    '@exceptions/(.*)': ['<rootDir>/src/exceptions/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/interfaces/$1'],
    '@middlewares/(.*)': ['<rootDir>/src/middlewares/$1'],
    '@repositories/(.*)': ['<rootDir>/src/repositories/$1'],
    '@resolvers/(.*)': ['<rootDir>/src/resolvers/$1'],
    '@typedefs/(.*)': ['<rootDir>/src/typedefs/$1'],
    '@utils/(.*)': ['<rootDir>/src/utils/$1']
  }
};
