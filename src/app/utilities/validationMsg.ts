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
                pattern: 'Password Pattern be like Jhon@1234'
            },
            confirmPassword: {
                required: 'Your Confirm Password is  requied.',
                mustMatch: 'Password Mismatch',
            },

        }
    }
}