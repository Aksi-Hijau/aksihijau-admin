import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {
    Link,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { API_URL } from "@/config/api.js"
import useLocalStorage from '@/hooks/useLocalStorage';

// ----------------------------------------------------------------------

const LoginForm = (): JSX.Element => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useLocalStorage('userData')

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleLogin = async (values) => {
        try {
            const response = await axios.post(`${API_URL}/sessions`, values)
            if (response.status === 201 && response.data.data.role === 'admin') {
                setUserData({ accessToken: response.data.data.accessToken, refreshToken: response.data.data.refreshToken })
                navigate('/dashboard', { replace: true });
            } else {
                formik.setFieldError('email', 'Email or password is wrong')
                formik.setFieldError('password', 'Email or password is wrong')
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                formik.setFieldError('email', 'Email or password is wrong')
                formik.setFieldError('password', 'Email or password is wrong')
            }
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: handleLogin
    });


    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox {...getFieldProps('remember')} checked={values.remember} />
                        }
                        label="Remember me"
                    />

                    {/* <Link component={RouterLink} variant="subtitle2" to="#">
                        Forgot password?
                    </Link> */}
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Login
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;
