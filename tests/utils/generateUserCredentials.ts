import { faker } from '@faker-js/faker'

export function generateUserCredentials() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        fullName: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: faker.phone.number({style: 'international'}),
        email: faker.internet.email({firstName, lastName}).toLowerCase(),
        password: faker.internet.password({length: 12, memorable: true})  
    }
}