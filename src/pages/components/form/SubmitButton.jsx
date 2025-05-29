import React from 'react';

const SubmitButton = ({ isSubmitting , text  }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`mt-2 w-full ${
      isSubmitting ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'
    } text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 ${
      !isSubmitting && 'transform hover:-translate-y-0.5'
    } focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50`}
  >
    {isSubmitting ? '...در حال پردازش' : text }
  </button>
);

export default SubmitButton;