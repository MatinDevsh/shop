import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { signInValidationSchema } from '../validation/signInValidation';
import FormHeader from '../FormHeader';
import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';
import { callApi } from '../../../../app/helper/callApi';
import { useCookies } from 'react-cookie';
import FormFooter from '../FormFooter';
import Router from 'next/router';
import {useAppDispatch} from "../../../../app/hooks"
import { updatePhoneVerifyToken } from '../../../../app/store/auth';

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [cookies, setCookie] = useCookies(['shop-token']);
  const [loginError, setLoginError] = useState(null);


const dispatch = useAppDispatch()
  const setPhoneVerifyToken = (token)=>{
    dispatch(updatePhoneVerifyToken(token))

  }
  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setLoginError(null);

    try {
      const res = await callApi().post('/auth/login', values);
      console.log(res);

      if (res.status === 200) {
        console.log('✅ ورود موفق');
        await Router.push('/components/form/signinStep2');
        setPhoneVerifyToken(res.data.token);

        // setCookie('shop-token', res.data.token, {
        //   maxAge: 3600 * 24 * 30,
        // });
  
        return;
      }
    } catch (err) {
      console.log("❌ خطا در ورود:", err);
      if (err.response?.status === 422) {
        setLoginError("شماره تلفن اشتباه است یا حساب کاربری وجود ندارد.");
      } else {
        setLoginError("خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید.");
      }


    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitting(false);
      }, 3000);
    }
  };

  return (
    <Formik
      initialValues={{ phone: '' }}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4" dir="rtl">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <FormHeader text='ورود' />

            <Form className="p-6 space-y-5">
              <FormInput
                name="phone"
                label="تلفن همراه :"
                type="text"
                errors={errors}
                touched={touched}
                placeholder="شماره تلفن همراه خود را وارد کنید"
              />

              <SubmitButton isSubmitting={isSubmitting} text='ورود' />

              {loginError && (
                <div className="text-red-600 text-sm text-center">{loginError}</div>
              )}
            </Form>

            <FormFooter text='می‌خواهم ثبت‌ نام کنم :' textlink='ثبت‌ نام' href='/components/form/signup' />
          </div>
        </div>
      )}
    </Formik>
  );
}
