"use client";
import React, {useCallback} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import FormInput from "@/components/FormInput";

const useYupValidationResolver = validationSchema =>
    useCallback(
        async data => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false
                });

                return {
                    values,
                    errors: {}
                };
            } catch (errors) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors, currentError) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? "validation",
                                message: currentError.message
                            }
                        }),
                        {}
                    )
                };
            }
        },
        [validationSchema]
    );
const formSchema = yup.object().shape({
    firstName: yup.string().required('First Name required'),
    lastName: yup.string().required('Last Name required'),
    floatingEmail: yup.string().email("Must be valid email").required("Email is required"),
    password: yup.string()
        .required("Password is required")
        .min(4, "Password length should be at least 4 characters")
        .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
        .min(4, "Password length should be at least 4 characters")
        .max(12, "Password cannot exceed more than 12 characters")
        .oneOf([yup.ref("password")], "Passwords do not match")
});

export default function FormYup() {
    const resolver = useYupValidationResolver(formSchema);
    const {register, handleSubmit, formState: {errors}} = useForm({resolver});
    const onSubmit = data => console.log(data);
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className='w-full max-w-screen-md' onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                register={register}
                error={errors.floatingEmail}
                name={"floatingEmail"}
                label={'Email address'}
                type={'email'}
            />
            <FormInput
                register={register}
                error={errors.password}
                name={"password"}
                label={'Password'}
                type={'password'}/>
            <FormInput
                register={register}
                error={errors.confirmPassword}
                name={"confirmPassword"}
                label={'Confirm Password'}
                type={'password'}/>

            <div className="grid md:grid-cols-2 md:gap-6">
                <FormInput
                    register={register}
                    error={errors.firstName}
                    name={"firstName"}
                    label={'First name'}
                />
                <FormInput
                    register={register}
                    error={errors.lastName}
                    name={"lastName"}
                    label={'Last name'}
                />
            </div>


            <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
            </button>
        </form>
    )
}
