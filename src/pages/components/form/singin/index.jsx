import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { signUpValidationSchema } from '../validation/signUpValidation';
import FormHeader from '../FormHeader';
import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';
import { callApi } from '../../../../app/helper/callApi';
import { useCookies } from 'react-cookie';




export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cookies, setCookie] = useCookies(['shop-token']);




  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await callApi().post('/auth/login', values);
    console.log(res);

    if (res.status == 200) {
      console.log('✅');
      setCookie('shop-token' , res.data.token , {

        maxAge:3600*24*30
     
      })
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
      initialValues={{ email: '', password: '' }}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4" dir="rtl">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <FormHeader text='ورود ' />

            <Form className="p-6 space-y-5">
              {/* <FormInput
                name="email"
                label="ایمیل :"
                type="text"
                errors={errors}
                touched={touched}
                placeholder="ایمیل خود را وارد کنید "
              /> */}

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

              <SubmitButton isSubmitting={isSubmitting} text='ورود' />
            </Form>

            {/* <FormFooter /> */}
          </div>
        </div>
      )}
    </Formik>
  );
}