import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({

  email: Yup.string()
    .email('فرمت ایمیل نامعتبر است')
    .required('ایمیل الزامی است'),
  password: Yup.string()
    .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد'
    )
    .required('رمز عبور الزامی است')
});