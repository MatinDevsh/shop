import * as Yup from 'yup';

const phoneRegex = /^09[0-3,9]\d{8}$/;


export const signInValidationSchema = Yup.object().shape({

  phone: Yup.string()
    .required('شماره موبایل الزامی است')
    .matches(phoneRegex, 'شماره موبایل معتبر نیست'),
});














// export const signUpValidationSchema = Yup.object().shape({

//   email: Yup.string()
//     .email('فرمت ایمیل نامعتبر است')
//     .required('ایمیل الزامی است'),
//   password: Yup.string()
//     .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//       'رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد'
//     )
//     .required('رمز عبور الزامی است'),
//   phone: Yup.string()
//     .required('شماره موبایل الزامی است')
//     .matches(phoneRegex, 'شماره موبایل معتبر نیست'),
// });