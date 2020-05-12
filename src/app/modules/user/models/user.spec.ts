import { User } from './user.model';

describe('User', () => {
    const userData = {
        _id: '1',
        firstname: 'Rono',
        lastname: 'Saha',
        password: '12345',
        rating: {
            communication: 5,
            attitude: 4,
            sense: 3,
        },
    };

    const user = new User(userData);

    it('should return the full name', () => {
        const fullName = 'Rono Saha';

        user.createFullName();

        expect(user.name).toBe(fullName);
    });

    it('should return the average rating', () => {
        const avgRating = 4;

        user.createRating();

        expect(user.avgRating).toBe(avgRating);
    });
});
