import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { signUpValidationSchema } from '../validation/signUpValidation';
import FormHeader from '../FormHeader';
import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';
import FormFooter from '../FormFooter';
import { callApi } from '../../../../app/helper/callApi';
import Router from 'next/router';


export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await callApi().post('/auth/register', values);


    if (res.status == 201) {
      console.log('✅');
      await Router.push('/components/form/singin');
      return;
    };


    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitting(false);
    }, 3000);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4" dir="rtl">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <FormHeader text='ثبت نام ' />

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
                name="email"
                label="ایمیل :"
                type="email"
                errors={errors}
                touched={touched}
                placeholder="example@email.com"
              />

              <FormInput
                name="password"
                label="رمز عبور :"
                type="password"
                errors={errors}
                touched={touched}
                placeholder="حداقل 8 کاراکتر"
              />

              <SubmitButton isSubmitting={isSubmitting} text='ثبت نام ' />
            </Form>

            <FormFooter />
          </div>
        </div>
      )}
    </Formik>
  );
}