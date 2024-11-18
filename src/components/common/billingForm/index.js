import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "react-phone-input-2/lib/material.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PhoneInput from "react-phone-input-2";
import { FormattedMessage } from "react-intl";
import { countryList } from "../../../assets/data/countryList";


export default function BillingForm({ touched, errors, handleChange, values, InputField, setFieldValue }) {

  return (
    <>
      <InputField
        label="First Name"
        name="billing.firstName"
        error={touched?.billing?.firstName && errors?.billing?.firstName}
        helperText={errors?.billing?.firstName}
        onChange={handleChange}
        value={values?.billing?.firstName}
      />
      <InputField
        label="Last Name"
        name="billing.lastName"
        error={touched?.billing?.lastName && errors?.billing?.lastName}
        helperText={errors?.billing?.lastName}
        onChange={handleChange}
        value={values?.billing?.lastName}
      />
      <InputField
        label="Email"
        name="billing.email"
        error={touched?.billing?.email && errors?.billing?.email}
        helperText={errors?.billing?.email}
        onChange={handleChange}
        value={values?.billing?.email}
      />
      <div className="mt-3">
        <label>
          <FormattedMessage id="Phone" />
        </label>
        <div dir={"ltr"}>
          <PhoneInput
            country={"sa"}
            value={values?.billing?.phone}
            countryCodeEditable={false}
            enableSearch={true}
            specialLabel=""
            style={{
              borderColor: errors.phone ? "#d32f2f" : "",
              marginTop: -20,
            }}
            onChange={(phone) => setFieldValue("billing.phone", phone)}
          />
          {errors.phone && <p className="input-error">{errors.phone}</p>}
        </div>
      </div>

      <InputField
        label="Address"
        name="billing.address"
        error={touched?.billing?.address && errors?.billing?.address}
        helperText={errors?.billing?.address}
        onChange={handleChange}
        value={values?.billing?.address}
      />
      <InputField
        label="State"
        name="billing.state"
        error={touched?.billing?.state && errors?.billing?.state}
        helperText={errors?.billing?.state}
        onChange={handleChange}
        value={values?.billing?.state}
      />
      <InputField
        label="City"
        name="billing.city"
        error={touched?.billing?.city && errors?.billing?.city}
        helperText={errors?.billing?.city}
        onChange={handleChange}
        value={values?.billing?.city}
      />
      <label className="mt-3">
        <FormattedMessage id="Country" />
      </label>
      <div>
        <Select
          name="billing.country"
          className="w-100"
          value={values?.billing?.country}
          onChange={handleChange}
          size="small"
        >
          {countryList.map((country, i) => (
            <MenuItem value={country} key={i}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </div>
      <InputField
        label="Postal Code"
        name="billing.postalCode"
        error={touched?.billing?.postalCode && errors?.billing?.postalCode}
        helperText={errors?.billing?.postalCode}
        onChange={handleChange}
        value={values?.billing?.postalCode}
        type="number"
      />
    </>
  );
}
