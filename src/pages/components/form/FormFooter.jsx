import React from 'react';

const FormFooter = () => (
  <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
    <p className="text-sm text-gray-600">
      قبلاً حساب کاربری دارید؟{' '}
      <a href="http://localhost:3000/components/form/singin" className="text-amber-600 hover:text-amber-700 font-medium">
        ورود
      </a>
    </p>
  </div>
);

export default FormFooter;