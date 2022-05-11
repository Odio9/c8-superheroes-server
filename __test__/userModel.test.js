const {
    deleteAllUsers,
    createUser,
    getUserByUsername,
    getUserById,
    updateUser,
    verifyPassword,
} = require('../db/models/userModel')

describe('User model', () => {

    beforeEach(async () => {
        await deleteAllUsers()
    })

    it('should find a created user by username', async () => {
        // setup
        await createUser({ username: 'testUser', password: 'testPassword'})

        // execute
        let foundUser = await getUserByUsername('testUser') 

        // verify
        expect(foundUser.username).toBe('testUser')
    })

    it('should default new users to not agent', async () => {
        // setup

        // execute
        await createUser({ username: 'testUser', password: 'testPassword'})

        // verify
        let foundUser = await getUserByUsername('testUser') 
        expect(foundUser.isAgent).toBe(false)
    })

    it('should encrypt user passwords', async () => {
        // setup

        // execute
        await createUser({ username: 'testUser', password: 'testPassword'})

        // verify
        let foundUser = await getUserByUsername('testUser') 
        expect(foundUser.password).not.toBe('testPassword')
    })

    it('should verify a password for a user', async () => {
        // setup
        await createUser({ username: 'testUser', password: 'testPassword'})
        let foundUser = await getUserByUsername('testUser') 

        // execute
        let verified = await verifyPassword('testPassword', foundUser.password)

        // verify
        expect(verified).toBe(true)
    })

    it('should verify a password for a user doesnt match', async () => {
        // setup
        await createUser({ username: 'testUser', password: 'testPassword'})
        let foundUser = await getUserByUsername('testUser') 

        // execute
        let verified = await verifyPassword('someOtherPassword', foundUser.password)

        // verify
        expect(verified).toBe(false)
    })

    it.skip('should not allow a repeated username', async () => {
        throw new Error('unimplemented')
    })

    it.skip('should find a created user by id', async () => {
        throw new Error('unimplemented')
    })

})
