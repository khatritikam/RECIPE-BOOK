export const validation_msg: { [key: string]: any } = {
    signUp: {
        signIn: {
            email: {
                required: 'Your E-mail is  requied.',
                email: 'E-mail you entered is invalid',
            },
            password: {
                required: 'Your Password is  requied.',
                minlength: (val: number) => `Password should contain at least ${val} carector. `,
                pattern: 'Password Should Contain at least 1 lowercase 1 uppercase 1 number and 1 special character'
            },
            confirmPassword: {
                required: 'Your Confirm Password is  requied.',
                mustMatch: 'Password Mismatch',
            },

        }
    }
}