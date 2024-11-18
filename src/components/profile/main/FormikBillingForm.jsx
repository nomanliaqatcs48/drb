import React from "react";
import styles from "./styles.module.scss";
import PhoneInput from "react-phone-input-2";
import { FormattedMessage } from "react-intl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {countryList} from "../../../assets/data/countryList";

export default function FormikBillingForm({ touched, errors, handleChange, values, InputField, setFieldValue }) {
  return (
    <div className="mt-3" >
       <hr />
      <div className="col-lg-12 mt-4">
        <h3 className={styles.heading}>Billing Address</h3>
      </div>
      <div className="col-lg-12">
        <InputField
          label="First Name"
          placeholder="Please input your first name"
          name="billing_address_fname"
          error={touched.billing_address_fname && errors.billing_address_fname}
          helperText={errors.billing_address_fname}
          onChange={handleChange}
          value={values.billing_address_fname}
        />
        <InputField
          label="Last Name"
          placeholder="Please input your last name"
          name="billing_address_lname"
          error={touched.billing_address_lname && errors.billing_address_lname}
          helperText={errors.billing_address_lname}
          onChange={handleChange}
          value={values.billing_address_lname}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Please input your email"
          name="billing_address_email"
          error={touched.billing_address_email && errors.billing_address_email}
          helperText={errors.billing_address_email}
          onChange={handleChange}
          value={values.billing_address_email}
        />
        <InputField
          label="Address"
          placeholder="Please input your address"
          name="billing_address_address"
          error={touched.billing_address_address && errors.billing_address_address}
          helperText={errors.billing_address_address}
          onChange={handleChange}
          value={values.billing_address_address}
        />

        <div className="mt-3">
          <label>
            <FormattedMessage id="Phone" />
          </label>
          <div dir={"ltr"}>
            <PhoneInput
              country={"sa"}
              value={values.billing_address_phone}
              countryCodeEditable={false}
              enableSearch={true}
              specialLabel=""
              style={{
                borderColor: errors.billing_address_phone ? "#d32f2f" : "",
                marginTop: -20,
              }}
              onChange={(phone) => setFieldValue("billing_address_phone", phone)}
            />
            {errors.billing_address_phone && (
              <p className="input-error">{errors.billing_address_phone}</p>
            )}
          </div>
        </div>
        <InputField
          label="City"
          placeholder="Please input your city"
          name="billing_address_city"
          error={touched.billing_address_city && errors.billing_address_city}
          helperText={errors.billing_address_city}
          onChange={handleChange}
          value={values.billing_address_city}
        />
         <InputField
          label="State"
          placeholder="Please input your state"
          name="billing_address_state"
          error={touched.billing_address_state && errors.billing_address_state}
          helperText={errors.billing_address_state}
          onChange={handleChange}
          value={values.billing_address_state}
        />
        <label className="input-label">
          <FormattedMessage id="Country" />
        </label>
        <div>
          <Select
            name="billing_address_country"
            className="w-100"
            value={values.billing_address_country}
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
          name="billing_address_postal_code"
          placeholder="Please input your postal code"
          error={touched.billing_address_postal_code && errors.billing_address_postal_code}
          helperText={errors.billing_address_postal_code}
          onChange={handleChange}
          value={values.billing_address_postal_code}
        />
      </div>
    </div>
  );
}
