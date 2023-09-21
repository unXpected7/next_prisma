// // ESM
// import { faker } from "@faker-js/faker";
 
// // CJS
// const { faker } = require("@faker-js/faker");
 
// export function createRandomUser(): User {
//   return {
//     userId: faker.datatype.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// }
 
// export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
//   count: 5,
// });