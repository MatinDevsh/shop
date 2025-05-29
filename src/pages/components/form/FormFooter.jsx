import React from 'react';

const FormFooter = (props) => (
  <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
    <p className="text-sm text-gray-600">
   {props.text}
      <a href={props.href} className="text-amber-600 hover:text-amber-700 font-medium">
      {props.textlink}
      </a>
    </p>
  </div>
);

export default FormFooter;