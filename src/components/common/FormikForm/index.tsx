// src/components/common/FormikForm/index.tsx
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Box, Button, CircularProgress } from '@mui/material';

interface FormikFormProps<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
  children: React.ReactNode;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
}

function FormikForm<T extends object>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  onCancel,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
}: FormikFormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize // Important for editing forms
    >
      {({ isSubmitting }) => (
        <Form>
          {children}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {onCancel && (
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {cancelButtonText}
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {submitButtonText}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default FormikForm;
