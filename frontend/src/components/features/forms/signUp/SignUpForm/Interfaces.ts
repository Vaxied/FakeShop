export type FormState = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmedPassword: string
}

export type InputProp = {
    id: string
    name: string
    label: string
    type: string
    placeholder: string
    maxLength?: number
    value: string
    inputErr: errString | errObject
    validationFunc: (arg1: string, arg2?: string) => boolean
}

export type InputProps = InputProp[]

export type InputErr = {
    firstName: boolean
    lastName: boolean
    email: boolean
    password: boolean
    diffPassword: boolean
    [key: string]: boolean
}
export type StateProps = {
    formState: FormState
    setFormState: (formState: FormState) => void
    showInputErr: InputErr
    setShowInputErr: (inputErr: InputErr) => void
}

export type errString = string

export type errObject = {
    length: string
    uppercase: string
    lowercase: string
    special: string
}
