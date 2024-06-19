const expectedFormDataStructure = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
}

const inputErrMsgs = {
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

function sanitizeData(formData) {
    // const sanitizedData = Object.keys(formData).forEach(
    //     (key) => (formData[key] = formData[key].trim())
    // )
    // console.log('sanitized data', sanitizedData)
    const trimmedData = Object.keys(formData).reduce((acc, curr) => {
        acc[curr] = typeof (formData[curr] === 'string')
            ? formData[curr].trim()
            : formData[curr]
        return acc
    }, {})
    console.log('trimmed data', trimmedData)
    return trimmedData
}

function isNameValid(firstName) {
    console.log(firstName)
    if (!firstName) return true
    return /^[a-zA-Z]+$/.test(firstName)
}

function isEmailValid(email) {
    if (!email) return true
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function isPasswordValid(password) {
    if (!password) return true
    return /(?=.{8,20})(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "])/g.test(
        password
    )
}

function arePasswordsEqual(confirmedPassword, password) {
    console.log('passwords', confirmedPassword, password)
    return password === confirmedPassword
}

function isAnyFieldEmpty(formData) {
    // TODO Change and test each individual field
    for (let key in formData) {
        console.log('Comparing is empty', formData[key] === '')
        if (formData[key] === '') return true
    }
    console.log('No empty fields')
    return false
}

function areFormFieldKeysEqual(formData) {
    const receivedKeys = Object.keys(formData)
    const expectedKeys = Object.keys(expectedFormDataStructure)

    // if (formData === expectedFormData) return true
    if (formData == null || expectedFormDataStructure == null) return false
    if (formData.length !== expectedFormDataStructure.length) return false

    for (let i = 0; i < receivedKeys; ++i) {
        if (receivedKeys[i] !== expectedKeys[i]) return false
    }
    return true
}

function isEveryFieldString(formData) {
    // TODO Change and test each individual field
    for (let key in formData) {
        console.log(
            ('Comparing is type string', typeof formData[key] !== 'string')
        )
        if (typeof formData[key] !== 'string') return false
    }
    return true
}

// function isAnyInputError(inputErrs) {
//     for (let key in inputErrs) {
//         if (inputErrs[key] === true) return true
//         console.log('input error found')
//     }
//     console.log('No input errors found')
//     return false
// }

function isEveryFieldValid(rawInputData) {
    const formData = sanitizeData(rawInputData)
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

module.exports = {
    inputErrMsgs,
    isEveryFieldValid,
}
