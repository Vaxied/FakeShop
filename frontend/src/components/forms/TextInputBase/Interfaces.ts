export type FormState = {
    [key: string]: string | undefined
}

export type InputProp = {
    id: string
    name: string
    label: string
    placeholder: string
    value: string
    inputErr: string | InputErrObject
    validationFunc: (arg1: string, arg2?: string) => boolean
    maxLength?: number
    type?: string
    showLabel?: boolean
    className?: string
}

export type InputProps = InputProp[]

export type ShowInputErr = {
    [key: string]: boolean
}

export type InputErrObject = {
    [key: string]: string
}

export type StateProps = {
    formState: FormState
    setFormState: (formState: FormState) => void
    showInputErr?: ShowInputErr
    setShowInputErr?: (ShowInputErr: ShowInputErr) => void
}

export type AddressForm = {
    firstName: string
    lastName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
    suite?: string
}

export type userAddress = {
    id: string
    firstName: string
    lastName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
    suite?: string
}
