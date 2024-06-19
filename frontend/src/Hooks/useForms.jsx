import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postData } from '../services/fetchWrapper'

function useForms() {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API

    async function handleSubmit(event, formState, inputErrs) {
        event.preventDefault()
        console.log(formState)
        if (!isFormFilledCorrectly(formState, inputErrs)) return
        const response = await postData(`${API}/register`, formState)
        if (response.status === 200) navigate('/')
        console.log(response)
        console.log('sending Data')
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
        console.log(confirmedPassword, password)
        return password === confirmedPassword
    }

    function isAnyFieldEmpty(formData) {
        for (let key in formData) {
            console.log('Comparing', formData[key], formData[key] === '')
            if (formData[key] === '') return true
        }
        console.log('No empty fields')
        return false
    }

    function isAnyInputError(inputErrs) {
        for (let key in inputErrs) {
            if (inputErrs[key] === true) return true
            console.log('input error found')
        }
        console.log('No input errors found')
        return false
    }

    function isFormFilledCorrectly(formData, inputErrs) {
        if (isAnyFieldEmpty(formData)) return false
        if (isAnyInputError(inputErrs)) return false
        console.log('form is filled correcly')
        return true
    }

    return {
        handleSubmit,
        isNameValid,
        isEmailValid,
        isPasswordValid,
        arePasswordsEqual,
        isAnyFieldEmpty,
    }
}

export default useForms
