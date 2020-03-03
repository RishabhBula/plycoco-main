import {
  IAddHolidaysFormValues,
  IAddHolidayFormikProps
} from "./../../interfaces/GlobalCalendar";
import * as Yup from "yup";
import { dateValidator } from "../../helpers";
import { IDateResponse } from "../../interfaces";
import moment from "moment";

export const AddHolidayValidations: Yup.ObjectSchema<Yup.Shape<
  object,
  IAddHolidayFormikProps
>> = Yup.object().shape<IAddHolidayFormikProps>({
  inputs: Yup.array().of(
    Yup.object().shape<IAddHolidaysFormValues>({
      date: Yup.mixed().test({
        name: "validate-date",
        test: function(val) {
          const { path, createError } = this;
          const { isValid, message }: IDateResponse = dateValidator(val, {
            minDate: moment().format(),
            maxDate: moment()
              .add(100, "years")
              .format()
          });
          return !val || isValid || createError({ path, message });
        }
      }),
      note: Yup.string().notRequired(),
      states: Yup.array()
        .of(Yup.number().required())
        .notRequired()
    })
  )
});