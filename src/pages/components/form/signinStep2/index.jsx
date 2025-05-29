import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { verifyPhone } from '../validation/verifyPhone';
import FormHeader from '../FormHeader';
import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';
import { callApi } from '../../../../app/helper/callApi';
import { useCookies } from 'react-cookie';



export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cookies, setCookie] = useCookies(['shop-token']);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setLoginError(null);

    try {
      const res = await callApi().post('/auth/login/verify-phone', values);
      console.log(res);
      if (res.status === 200) {
        console.log('✅ ورود موفق');
       
        setCookie('shop-token', res.data.token, {
          maxAge: 3600 * 24 * 30,
        });

        return;
      }
    } catch (err) {
      console.log("❌ خطا در ورود:", err);
      if (err.response?.status === 422) {
        setLoginError("422");
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
      initialValues={{ code: '' }}
      validationSchema={verifyPhone}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4" dir="rtl">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <FormHeader text='ورود' />

            <Form className="p-6 space-y-5">
              <FormInput
                name="code"
                label="کد ارسال شده را وارد کنید :"
                type="text"
                errors={errors}
                touched={touched}
                placeholder="کد 6 رقمی"
              />

              <SubmitButton isSubmitting={isSubmitting} text='تایید' />

              {loginError && (
                <div className="text-red-600 text-sm text-center">{loginError}</div>
              )}
            </Form>

            {/* <FormFooter text='می‌خواهم ثبت‌نام کنم :' textlink='ثبت‌نام' href='/components/form/signup' /> */}
          </div>
        </div>
      )}
    </Formik>
  );
}
