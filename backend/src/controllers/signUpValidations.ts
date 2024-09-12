import { SignUpForm } from '../@types/signUpForm'

const expectedFormDataStructure = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
}

export const inputErrMsgs = {
    invalidName: '* Please input letters only.',
    invalidEmail: '* Please input a valid email format.',
    invalidPassword: {
        length: '* Minimum 8 characters long',
        uppercase: '* At least one uppercase character',
        lowercase: '* At least one lowercase character',
        special: '* At least one special character',
    },
    differentPasswords: 'Passwords must be equal.',
}

function sanitizeData(formData: SignUpForm) {
    const trimmedData = Object.keys(formData).reduce((acc: any, curr: any) => {
        acc[curr] = typeof (formData[curr] === 'string')
            ? formData[curr].trim()
            : formData[curr]
        return acc
    }, {})
    console.log('trimmed data', trimmedData)
    return trimmedData
}

function isNameValid(firstName: string) {
    console.log(firstName)
    if (!firstName) return true
    return /^[a-zA-Z]+$/.test(firstName)
}

function isEmailValid(email: string) {
    if (!email) return true
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function isPasswordValid(password: string) {
    if (!password) return true
    return /(?=.{8,20})(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "])/g.test(
        password
    )
}

function arePasswordsEqual(confirmedPassword: string, password: string) {
    console.log('passwords', confirmedPassword, password)
    return password === confirmedPassword
}

function isAnyFieldEmpty(formData: SignUpForm) {
    for (let key in formData) {
        console.log('Comparing is empty', formData[key] === '')
        if (formData[key] === '') return true
    }
    console.log('No empty fields')
    return false
}

function areFormFieldKeysEqual(
    formData: SignUpForm,
    expectedFormDataStructure: SignUpForm
) {
    const receivedKeys = Object.keys(formData)
    const expectedKeys = Object.keys(expectedFormDataStructure)

    if (receivedKeys.length !== expectedKeys.length) return false

    for (let i = 0; i < receivedKeys.length; ++i) {
        if (receivedKeys[i] !== expectedKeys[i]) return false
    }
    return true
}

function isEveryFieldString(formData: SignUpForm) {
    for (let key in formData) {
        console.log(
            `Comparing is type string, ${typeof formData[key] !== 'string'}`
        )
        if (typeof formData[key] !== 'string') return false
    }
    return true
}

export function isEveryFieldValid(rawInputData: any) {
    const formData: SignUpForm = sanitizeData(rawInputData)
    if (!formData) return false
    console.log('form Data exists')
    if (!areFormFieldKeysEqual(formData, expectedFormDataStructure))
        return false
    console.log('form hasnt been altered')
    if (isAnyFieldEmpty(formData)) return false
    console.log('no empty fields')
    if (!isEveryFieldString(formData)) return false
    console.log('every field is string')
    if (!isNameValid(formData.firstName) || !isNameValid(formData.lastName))
        return false
    console.log('first and last names are valid')
    if (!isEmailValid(formData.email)) return false
    console.log('email is valid')
    if (
        !isPasswordValid(formData.password) ||
        !isPasswordValid(formData.confirmedPassword)
    )
        return false
    if (!arePasswordsEqual(formData.password, formData.confirmedPassword))
        return false
    console.log('passwords are equal')
    console.log('Every field is ok')
    return true
}

// module.exports = {
//     inputErrMsgs,
//     isEveryFieldValid,
// }
