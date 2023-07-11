"use client";
import React from 'react';
import {useForm} from "react-hook-form";
import FormInput from "@/components/FormInput";

export default function Form() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className='w-full max-w-screen-md' onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                register={register}
                rules={{
                    required: 'Required field',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                }}
                error={errors.floatingEmail}
                name={"floatingEmail"}
                label={'Email address'}
                type={'email'}/>


            <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
            </button>
        </form>
    )
}
