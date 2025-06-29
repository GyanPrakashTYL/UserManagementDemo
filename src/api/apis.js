/**
 * These are not actual API Wrappers
 * These are just for testing
 */

import { SHA256, enc } from 'crypto-js'

const savedUserDb = localStorage.getItem('user-db')
const savedSessionDb = localStorage.getItem('session-db')

const userDb = savedUserDb !== '[]' && savedUserDb ? JSON.parse(savedUserDb) : [];
const sessionDb = savedSessionDb !== '[]' && savedSessionDb ? JSON.parse(savedSessionDb) : [];

// Constant Backup

setInterval(() => {
    console.log('DB Saved')
    localStorage.setItem('user-db', JSON.stringify(userDb))
    localStorage.setItem('session-db', JSON.stringify(sessionDb))
}, 3000)

export async function registerUser(userInfo) {
    if(userDb.find((user) => user.email === userInfo.email)) {
        return {
            success: false,
            message: 'Email is already Registered'
        }
    } else if(userDb.find((user) => user.username === userInfo.username)) {
        return {
            success: false,
            message: 'This username is not available'
        }
    } else {
        userDb.push({
            id: userDb.length,
            username: userInfo.username,
            email: userInfo.email,
            password: SHA256(userInfo.password).toString(enc.Base64url),  // Unsalted (Only for testing)
            secret: ''
        })
        console.log(userDb)
        return {
            success: true,
            message: 'User registered successfully'
        }
    }
}

export async function loginUser(email, password) {
    const userInDb = userDb.find((user) => user.email === email)

    if(!userInDb) {
        return {
            success: false,
            message: 'Account does not exist.'
        }
    } else if(userInDb.password !== SHA256(password).toString(enc.Base64url)) {
        return {
            success: false,
            message: 'Invalid Credentials.'
        } 
    } else {
        const sessionToken = crypto.randomUUID().toString('base64url')

        sessionDb.push({
            sessionToken,
            userId: userInDb.id
        })

        console.log(sessionDb)

        return {
            success: true,
            message: 'Logged In successfully',
            sessionToken
        }
    }
}

export async function getUserInfo(sessionToken) {
    const userSession = sessionDb.find((session) => session.sessionToken === sessionToken)
    if(!userSession) {
        return {
            success: false,
            message: 'Invalid session token'
        }
    } else {
        const userId = userSession.userId
        const userInfo = userDb.find((user) => user.id === userId)

        return {...userInfo, success: true}
    }
}

export async function changeUserSecret(sessionToken, newSecret) {
    const userSession = sessionDb.find((session) => session.sessionToken === sessionToken)
    if(!userSession) {
        return {
            success: false,
            message: 'Invalid session token'
        }
    } else {
        const userId = userSession.userId
        const userInfo = userDb.find((user) => user.id === userId)

        userDb[userId].secret = newSecret

        console.log(userDb)

        return {
            success: true,
            message: 'Secret updated successfully'
        }
    }
}