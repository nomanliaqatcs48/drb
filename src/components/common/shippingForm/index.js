import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "react-phone-input-2/lib/material.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PhoneInput from "react-phone-input-2";
import { FormattedMessage } from "react-intl";
import { countryList } from "../../../assets/data/countryList";

export default function ShippingForm({
  touched,
  errors,
  handleChange,
  values,
  InputField,
  setFieldValue,
  billingInfo,
  setIsSameShippingAddress,
  isSameShippingAddress
}) {
  return (
    <>
      <InputField
        label="First Name"
        name="shipping.firstName"
        error={touched?.shipping?.firstName && errors?.shipping?.firstName}
        helperText={errors?.shipping?.firstName}
        onChange={handleChange}
        value={values?.shipping?.firstName}
      />
      <InputField
        label="Last Name"
        name="shipping.lastName"
        error={touched?.shipping?.lastName && errors?.shipping?.lastName}
        helperText={errors?.shipping?.lastName}
        onChange={handleChange}
        value={values?.shipping?.lastName}
      />
      <InputField
        label="Email"
        name="shipping.email"
        error={touched?.shipping?.email && errors?.shipping?.email}
        helperText={errors?.shipping?.email}
        onChange={handleChange}
        value={values?.shipping?.email}
      />
      <div className="mt-3">
        <label>
          <FormattedMessage id="Phone" />
        </label>
        <div dir={"ltr"}>
          <PhoneInput
            country={"sa"}
            value={values?.shipping?.phone}
            countryCodeEditable={false}
            enableSearch={true}
            specialLabel=""
            style={{
              borderColor: errors.phone ? "#d32f2f" : "",
              marginTop: -20,
            }}
            onChange={(phone) => setFieldValue("shipping.phone", phone)}
          />
          {errors.phone && <p className="input-error">{errors.phone}</p>}
        </div>
      </div>

      <InputField
        label="Address"
        name="shipping.address"
        error={touched?.shipping?.address && errors?.shipping?.address}
        helperText={errors?.shipping?.address}
        onChange={handleChange}
        value={values?.shipping?.address}
      />
      <InputField
        label="State"
        name="shipping.state"
        error={touched?.shipping?.state && errors?.shipping?.state}
        helperText={errors?.shipping?.state}
        onChange={handleChange}
        value={values?.shipping?.state}
      />
      <InputField
        label="City"
        name="shipping.city"
        error={touched?.shipping?.city && errors?.shipping?.city}
        helperText={errors?.shipping?.city}
        onChange={handleChange}
        value={values?.shipping?.city}
      />
      <label className="mt-3">
        <FormattedMessage id="Country" />
      </label>
      <div>
        <Select
          name="shipping.country"
          className="w-100"
          value={values?.shipping?.country}
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
        name="shipping.postalCode"
        error={touched?.shipping?.postalCode && errors?.shipping?.postalCode}
        helperText={errors?.shipping?.postalCode}
        onChange={handleChange}
        value={values?.shipping?.postalCode}
        type="number"
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSameShippingAddress}
              name="isSameAddress"
              onChange={(e) => {
                const value = JSON.parse(e.target.checked)
                if (!value) {
                  setFieldValue("billing", values.shipping);
                } else {
                  setFieldValue("billing", billingInfo);
                }
                setIsSameShippingAddress(value)
                localStorage.setItem(
                  "isSameShippingAddress",
                  value
                );
              }}
            />
          }
          label="Same as shipping address"
        />
      </FormGroup>
    </>
  );
}
