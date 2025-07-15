/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Formik, Form, type FormikHelpers } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { OrderSchema } from "../../helpers/orderSchema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch } from "../../hooks/useDispatch";
import {
  createOrder,
  setCurrentOrder,
  updateOrder,
} from "../../store/orders/slice";

import type { OrderStatus } from "../../types/order";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../../store/orders/selectors";

const OrderForm = ({
  onSubmit,
  onClose,
}: {
  onSubmit: () => void;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const currentOrder = useSelector(selectCurrentOrder);

  const initialValues = {
    id: currentOrder?.id || 0,
    client: currentOrder?.client || "",
    date: currentOrder?.date ? dayjs(currentOrder.date) : dayjs(),
    status: currentOrder?.status || ("" as OrderStatus),
    amount: currentOrder?.amount || ("" as never),
  };

  const handleSubmit = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    if (!currentOrder) {
      values.id = Number(Math.random().toString().slice(2, 8));
    }
    const payload = { ...values, date: values.date.toISOString() };
    dispatch(currentOrder ? updateOrder(payload) : createOrder(payload));
    actions.resetForm();
    dispatch(setCurrentOrder(null));
    onSubmit();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={OrderSchema}
    >
      {({ values, setFieldValue, handleBlur, touched, errors }) => (
        <Form className="form">
          <Field
            name="client"
            as={TextField}
            label="Client name"
            variant="outlined"
            fullWidth
            className="field"
            error={touched.client && Boolean(errors.client)}
            helperText={<ErrorMessage name="client" />}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Дата доставки"
              value={values.date}
              onChange={(value) => setFieldValue("date", value)}
              slotProps={{
                textField: {
                  name: "date",
                  fullWidth: true,
                  error: touched.date && Boolean(errors.date),
                  helperText: <ErrorMessage name="date" />,
                },
              }}
            />
          </LocalizationProvider>

          <Field name="status">
            {({ field }: { field: any }) => (
              <FormControl
                fullWidth
                className="field"
                error={touched.status && Boolean(errors.status)}
              >
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  {...field}
                  labelId="status-label"
                  id="status"
                  label="Status"
                  onBlur={handleBlur}
                >
                  {["Відвантажено", "Очікує оплати", "Виконано"].map(
                    (value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    )
                  )}
                </Select>
                <div className="errMessage">
                  <ErrorMessage name="status" component="div" />
                </div>
              </FormControl>
            )}
          </Field>

          <Field name="amount">
            {({ field }: { field: any }) => (
              <TextField
                {...field}
                type="number"
                label="Amount"
                variant="outlined"
                fullWidth
                className="field"
                error={touched.amount && Boolean(errors.amount)}
                helperText={<ErrorMessage name="amount" />}
              />
            )}
          </Field>

          <Button type="submit" variant="contained" color="primary">
            {currentOrder ? "Зберегти" : "Створити"}
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="contained"
            color="error"
          >
            Відмінити
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
