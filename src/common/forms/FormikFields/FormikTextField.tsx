import React from "react";
import { getIn } from "formik";
import { Input } from "reactstrap";
import { toLower } from "lodash";
import { getHelperText, handleChange, handleBlur } from "./utils";
import { IFormikTextField } from "../../../interfaces/FormikTextField";

export const FormikTextField = (props: IFormikTextField) => {
  const {
    field,
    form,
    type,
    variant = "standard",
    disabled = false,
    inputStyle,
    classes,
    label,
    isRequired,
    onChange,
    alwaysShowHelperText = true,
    ...rest
  } = props;
  const { name, value } = field;
  const { touched, errors, isSubmitting, setFieldValue } = form;
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;
  const shrink = field.value !== null && toLower(field.value).length > 0;
  let newLabel = label;
  return (
    <>
      <Input
        {...rest}
        {...field}
        type={type}
        label={newLabel}
        className={errors.value ? `text-input error left` : `text-input`}
        value={value !== "" ? value : ""}
        onChange={handleChange(props)}
        onClick={rest.onClick || null}
        onBlur={
          name !== "email"
            ? handleBlur(value, props)
            : (e: any) => {
                //get string before a @ to set username
                const username = value
                  ? value.substring(0, value.indexOf("@"))
                  : "";

                setFieldValue("userName", username);
                handleBlur(value, props);
              }
        }
        // disabled={isSubmitting || disabled}
        variant={variant}
        // fullwidth={true}
      />
      {name === "fee" ||
      name === "night" ||
      name === "weekendAllowance" ||
      name === "holiday" ? (
        <div className="required-error left">{showError && fieldError}</div>
      ) : (
        <div className="required-error ">{showError && fieldError}</div>
      )}
    </>
  );
};