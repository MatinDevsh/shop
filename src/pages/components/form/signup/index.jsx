import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { signUpValidationSchema } from '../validation/signUpValidation';
import FormHeader from '../FormHeader';
import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';
import FormFooter from '../FormFooter';
import { callApi } from '../../../../app/helper/callApi';
import Router from 'next/router';

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setApiError(null);
    console.log("📤 Sending request with values:", values);

    try {
      const res = await callApi().post('/auth/register', values);
      console.log('✅ ثبت‌نام موفق');
      console.log(res);

      await Router.push('/components/form/signin');
    } catch (err) {
      console.log("❌ خطا در ثبت‌نام:");

    
      if (err.response?.status === 422) {
        const phoneError = err.response.data?.errors?.phone;
        if (phoneError === 'the phone is already exists') {
          setApiError('این شماره تلفن قبلاً ثبت شده است.');
        } else {
          setApiError('مقادیر وارد شده معتبر نیستند.');
        }
      } else if (err.response?.data?.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('خطایی در ثبت‌نام رخ داد.');
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
      initialValues={{ name: '', phone: '' }}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4" dir="rtl">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <FormHeader text="ثبت نام" />

            <Form className="p-6 space-y-5">
              <FormInput
                name="name"
                label="نام کاربری :"
                type="text"
                errors={errors}
                touched={touched}
                placeholder="نام کاربری خود را وارد کنید"
              />

              <FormInput
                name="phone"
                label="تلفن همراه :"
                type="text"
                errors={errors}
                touched={touched}
                placeholder="شماره تلفن همراه خود را وارد کنید"
              />

              <SubmitButton isSubmitting={isSubmitting} text="ثبت نام" />

              {apiError && (
                <div className="text-red-600 text-sm text-center">{apiError}</div>
              )}
            </Form>

            <FormFooter
              text="آیا قبلاً ثبت‌نام کرده‌اید؟"
              textlink="ورود"
              href="/components/form/signin"
            />
          </div>
        </div>
      )}
    </Formik>
  );
}
