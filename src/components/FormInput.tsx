import React from 'react';
import {FieldValues, UseFormRegister, RegisterOptions, FieldError, Merge, FieldErrorsImpl} from "react-hook-form";

export declare interface IFormInput {
    name: string
    label: string
    type?: string
    register: UseFormRegister<FieldValues>
    rules?: RegisterOptions
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export default function FormInput(props: IFormInput) {
    const {name, label, type = 'text', register, rules, error} = props;
    console.log(error)
    return (
        <div className="relative z-0 w-full mb-6 group">
            {/* register your input into the hook by invoking the "register" function */}
            <input
                {...register("floatingEmail", {...rules})}
                type={type} name={name} id={name}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-slate-50 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
            />
            {error && <p className="mt-2 text-sm text-red-400 dark:text-red-500">
                <span className="font-medium">{error.message}</span>
            </p>}
            <label htmlFor={name}
                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:z-10 peer-focus:scale-75 peer-focus:-translate-y-6">
                {label}</label>
        </div>
    )
}