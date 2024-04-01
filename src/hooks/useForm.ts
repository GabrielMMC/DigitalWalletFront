import { useState, ChangeEvent, ChangeEventHandler } from 'react';

type FormState = {
  [key: string]: any;
};

type ErrorsState = {
  [key: string]: string | null;
};

type FileData = {
  value: File | null;
  url: string | null;
};

type InitialState = {
  [key: string]: any;
};

const useForm = (initialState: InitialState) => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ErrorsState>({});

  // Handles changes to form fields and updates the form state accordingly
  const handleChange = (event: ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = event.target

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    resetError(name);
  };

  // Identifies errors according to the field value
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, maxLength } = event.target;
    if (!value) setErrors({ ...errors, [name]: `Campo em branco` });
    if (value.length < maxLength) setErrors({ ...errors, [name]: `São necessários ${maxLength} caracteres` });
  };

  // Handles changes to file input fields and updates the form state with the selected file and its URL
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const file = files ? files[0] : null;

    if (file) {
      generateImageUrl(file, (url) => {
        setForm((prevForm) => ({
          ...prevForm,
          [name]: { value: file, url },
        }));
      });
    }
  };

  // Reads a file using the FileReader API and generates a URL for the file
  const generateImageUrl = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        callback(event.target.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  // Sets the value of a form field
  const setField = (fieldName: string, fieldValue: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: fieldValue,
    }));
  };

  // Sets an error message for a form field
  const setError = (fieldName: string, errorMessage: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  // Resets the error message for a form field
  const resetError = (fieldName: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: null,
    }));
  };

  // Resets the error message for a form field
  const resetErrors = () => {
    setErrors({});
  };

  // Resets the form state and error messages
  const resetForm = () => {
    setForm(initialState);
    setErrors({});
  };

  // Validates that all required fields have a value
  const hasEmpty = (ignoreFields?: string[]) => {
    const errorFields = Object.keys(form).filter((fieldName) => !form[fieldName] && !ignoreFields?.includes(form[fieldName]));

    if (errorFields.length > 0) {
      errorFields.forEach((fieldName) =>
        setError(fieldName, 'Campo requerido')
      );
      return false;
    }
    return true;
  };

  // Returns the current form state
  const getFormData = () => {
    return form;
  };

  // Validates the type of a form field value against a regular expression and sets an error message if the validation fails
  const validateFieldType = (fieldName: string, regex: RegExp, errorMessage: string) => {
    const fieldValue = form[fieldName];
    if (fieldValue && !fieldValue.toString().match(regex)) {
      setError(fieldName, errorMessage);
      return false;
    }
    return true;
  };


  return {
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    handleFileChange,
    generateImageUrl,
    setField,
    setError,
    resetError,
    resetForm,
    hasEmpty,
    getFormData,
    validateFieldType,
    handleBlur,
    resetErrors
  };
};

export default useForm;