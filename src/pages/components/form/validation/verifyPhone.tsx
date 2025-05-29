import * as Yup from 'yup';

const verifyCode = /^\d{6}$/;


export const verifyPhone = Yup.object().shape({

  code: Yup.string()
    .required('این فیلد اجباری است ')
    .matches(verifyCode,'کد باید 6 عدد باشد ' ),
});













