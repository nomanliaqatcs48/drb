import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./styles.module.scss";
import PhoneInput from "react-phone-input-2";
import { FormattedMessage } from "react-intl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { countryList } from "../../../assets/data/countryList";

export default function FormikForm({
  touched,
  errors,
  handleChange,
  values,
  InputField,
  setFieldValue,
  billingInfo,
  isSameShippingAddress,
  setIsSameShippingAddress,
}) {
  return (
    <div className="mt-4">
      <hr />
      <div className="col-lg-12 mt-4">
        <h3 className={styles.heading}>Shipping Address</h3>
      </div>
      <div className="col-lg-12">
        <InputField
          label="First Name"
          placeholder="Please input your first name"
          name="address_fname"
          error={touched.address_fname && errors.address_fname}
          helperText={errors.address_fname}
          onChange={handleChange}
          value={values.address_fname}
        />
        <InputField
          label="Last Name"
          placeholder="Please input your last name"
          name="address_lname"
          error={touched.address_lname && errors.address_lname}
          helperText={errors.address_lname}
          onChange={handleChange}
          value={values.address_lname}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Please input your email"
          name="address_email"
          error={touched.address_email && errors.address_email}
          helperText={errors.address_email}
          onChange={handleChange}
          value={values.address_email}
        />
        <InputField
          label="Address"
          placeholder="Please input your address"
          name="address_address"
          error={touched.address_address && errors.address_address}
          helperText={errors.address_address}
          onChange={handleChange}
          value={values.address_address}
        />

        <div className="mt-3">
          <label>
            <FormattedMessage id="Phone" />
          </label>
          <div dir={"ltr"}>
            <PhoneInput
              country={"sa"}
              value={values.address_phone}
              countryCodeEditable={false}
              enableSearch={true}
              specialLabel=""
              style={{
                borderColor: errors.address_phone ? "#d32f2f" : "",
                marginTop: -20,
              }}
              onChange={(phone) => setFieldValue("address_phone", phone)}
            />
            {errors.address_phone && (
              <p className="input-error">{errors.address_phone}</p>
            )}
          </div>
        </div>
        <InputField
          label="City"
          placeholder="Please input your city"
          name="address_city"
          error={touched.address_city && errors.address_city}
          helperText={errors.address_city}
          onChange={handleChange}
          value={values.address_city}
        />
        <InputField
          label="State"
          placeholder="Please input your state"
          name="address_state"
          error={touched.address_state && errors.address_state}
          helperText={errors.address_state}
          onChange={handleChange}
          value={values.address_state}
        />
        <label className="input-label">
          <FormattedMessage id="Country" />
        </label>
        <div>
          <Select
            name="address_country"
            className="w-100"
            value={values.address_country}
            onChange={handleChange}
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
          type="number"
          name="address_postal_code"
          placeholder="Please input your postal code"
          error={touched.address_postal_code && errors.address_postal_code}
          helperText={errors.address_postal_code}
          onChange={handleChange}
          value={values.address_postal_code}
        />
        <FormGroup className="mt-3">
          <FormControlLabel
            control={
              <Checkbox
                checked={isSameShippingAddress}
                name="isSameAddress"
                onChange={(e) => {
                  const value = JSON.parse(e.target.checked);
                  if (!value) {
                    setFieldValue("billing", values.shipping);
                  } else {
                    setFieldValue("billing", billingInfo);
                  }
                  setIsSameShippingAddress(value);
                  localStorage.setItem("isSameShippingAddress", value);
                }}
              />
            }
            label="Same as shipping address"
          />
        </FormGroup>
      </div>
    </div>
  );
}
