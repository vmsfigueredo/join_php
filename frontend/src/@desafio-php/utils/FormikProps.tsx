import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {FormikProps} from "formik";

export const exists = (value: any) => {
  if (typeof value !== 'undefined' && value !== null && value !== '') {
    return true;
  }

  return false;
};

export type FormikPropsType = {
  name: string,
  value: string,
  onChange: () => any,
  onBlur: () => any,
  error: boolean,
  helperText: string
}

export const formikProps = (field: string, formik: FormikProps<any>) => ({
  name: field,
  value: formikHelpers.getValue(field, formik),
  onChange: (event: any) => {
    // Forçar set touched para validações
    const {touched} = formik;
    _.set(touched, field, true);
    formik.setTouched(touched);

    // Verifica o tipo do event e seta o valor no formik
    if (event) {
      switch (true) {
        case event instanceof Date:
        case event instanceof moment:
        case typeof event === 'string':
          formik.setFieldValue(field, event);

          return;
        case event.nativeEvent instanceof Event:
        case event instanceof PointerEvent:
        case event instanceof KeyboardEvent:
          formik.setFieldValue(field, event.target.value);

          return;
        default:
          console.warn(
            `formikProps não está preparado para lidar com esse tipo de evento. (${event.constructor.name})`
          );
      }
    }
  },
  onBlur: formik.handleBlur,
  error: formikHelpers.getTouched(field, formik) && Boolean(formikHelpers.getErrors(field, formik)),
  helperText: formikHelpers.getTouched(field, formik) && <>{formikHelpers.getErrors(field, formik)} </>
});

export const formikHelpers = {
  getValue: (fieldName: string, formik: FormikProps<any>) => _.get(formik.values, fieldName) ?? '',
  getTouched: (fieldName: string, formik: FormikProps<any>) => _.get(formik.touched, fieldName),
  getErrors: (fieldName: string, formik: FormikProps<any>) => _.get(formik.errors, fieldName)

};
