import React, {useContext} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormattedMessage } from "react-intl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { isMobile } from "react-device-detect";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import { IntlContext } from "../../context/Internationalization";
import {
  setProductTab,
} from "../../redux/actions/product";

const Filters = ({selectedTab, SelectCategory, sortingFilter, setSortingFilterVal}) => {
    const context = useContext(IntlContext);
    const dispatch = useDispatch();
    
    return (
        <Row className="mb-4" dir={context.state.locale === "sa" && "rtl"}>
          <Col xs={12} md={12} className="mb-3">
            <h2>
              {selectedTab === "all-product" ? (
                <FormattedMessage id={"Souvenirs"} />
              ) : (
                <FormattedMessage id={"Printable Souvenirs"} />
              )}
            </h2>
          </Col>

          <Col xs={12} md={3} className="desktop-wrap">
            {SelectCategory()}
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center"
            style={{ marginTop: -6 }}
          >
            <Tabs
              value={selectedTab}
              onChange={(event, newValue) => dispatch(setProductTab(newValue))}
            >
              <Tab
                label={
                  <span className="tabLabel" style={context.state.locale === "sa" ? {fontFamily: 'Noto Naskh Arabic'}: {}}>
                    <FormattedMessage id={"All Souvenirs"} />
                  </span>
                }
                value="all-product"
              />
              <Tab
                label={
                  <span className="tabLabel" style={context.state.locale === "sa" ? {fontFamily: 'Noto Naskh Arabic'}: {}}>
                    <FormattedMessage id={"Printable Souvenirs"} />
                  </span>
                }
                value="printable"
              />
            </Tabs>
          </Col>
          {isMobile && selectedTab === "printable" ? (
            <div />
          ) : (
            <>
              <Col xs={12} md={3} className="mbl-wrap mt-4 mb-4">
                {SelectCategory()}
              </Col>
              <Col md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel><FormattedMessage id={"Filters"} /></InputLabel>
                  <Select
                    value={sortingFilter}
                    label={<FormattedMessage id={"Filters"} />}
                    onChange={(e) => setSortingFilterVal(e)}
                  >
                    <MenuItem value="default"><FormattedMessage id={"Default Sorting"} /></MenuItem>
                    <MenuItem value="1"><FormattedMessage id={"Sort by price: low to high"} /> </MenuItem>
                    <MenuItem value="-1"><FormattedMessage id={"Sort by price: high to low"} /></MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </>
          )}
        </Row>
    );
}

export default Filters;
