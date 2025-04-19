import { Field, ErrorMessage } from 'formik';

export default function FormInput({ name, label, type, errors, touched, placeholder }) {
  return (
    <div className="text-right">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className={`w-full px-4 py-2.5 rounded-lg border ${
          errors[name] && touched[name] ? 'border-red-400' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all text-gray-700`}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1.5 flex items-center justify-end"
      />
    </div>
  );
}