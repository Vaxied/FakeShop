import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postData } from '@lib/services/fetchWrapper'
import { FormState } from '@components/forms/TextInputBase/Interfaces'

type inputErrs = {
    [key: string]: boolean
}

function useForms() {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API

    const labelBgStyleColor =
        'bg-gradient-to-b from-container from-55% to-white to-55%'

    //TODO: make the api route dyanmic
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        formState: FormState,
        inputErrs: inputErrs,
    ) {
        event.preventDefault()
        console.log(formState)
        if (!isFormFilledCorrectly(formState, inputErrs)) return
        const response = await postData(`${API}/register`, formState)
        if (response.status === 200) navigate('/')
        console.log(response)
        console.log('sending Data')
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
            password,
        )
    }

    function arePasswordsEqual(confirmedPassword: string, password?: string) {
        console.log(confirmedPassword, password)
        return password === confirmedPassword
    }

    function isAnyFieldEmpty(formData: FormState) {
        for (let key in formData) {
            console.log('Comparing', formData[key], formData[key] === '')
            if (formData[key] === '') return true
        }
        console.log('No empty fields')
        return false
    }

    function isAnyInputError(inputErrs: inputErrs) {
        for (let key in inputErrs) {
            if (inputErrs[key] === true) return true
            console.log('input error found')
        }
        console.log('No input errors found')
        return false
    }

    function isFormFilledCorrectly(formData: FormState, inputErrs: inputErrs) {
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
        labelBgStyleColor,
    }
}

export default useForms
