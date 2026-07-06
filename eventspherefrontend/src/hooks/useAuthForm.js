import { useState, useCallback } from 'react';

export const useAuthForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((field) => (event) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const fieldErrors = validate({ ...values, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || '' }));
    }
  }, [touched, validate, values]);

  const handleBlur = useCallback((field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || '' }));
  }, [validate, values]);

  const validateForm = useCallback(() => {
    const formErrors = validate(values);
    setErrors(formErrors);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );
    return Object.keys(formErrors).length === 0;
  }, [validate, values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  };
};
