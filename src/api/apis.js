/**
 * These are not actual API Wrappers
 * These are just for testing
 */

import { createHash } from 'node:crypto'

const sha256hash = (password) => createHash('sha256').update(password).digest('base64');

const userDb = [];
const sessionDb = [];

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
            password: sha256hash(userInfo.password),  // Unsalted (Only for testing)
            secret: ''
        })
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
    } else if(userInDb.password !== sha256hash(password)) {
        return {
            success: false,
            message: 'Invalid Credentials.'
        } 
    } else {
        const sessionToken = crypto.randomBytes(64).toString('base64url')

        sessionDb.push({
            sessionToken,
            userId: userInDb.id
        })

        localStorage.setItem('session-token', sessionToken)

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

        return userInfo
    }
}

export async function changeUserSecret(sessionToken, newSecret) {
    
}