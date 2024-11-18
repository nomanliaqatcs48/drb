import React, {useContext} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormattedMessage } from "react-intl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { isMobile } from "react-device-detect";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch } from "react-redux";
import { IntlContext } from "../../context/Internationalization";
import {
  setProductTab,
} from "../../redux/actions/product";

const Filters = ({selectedTab, SelectCategory, SelectBrand, sortingFilter, setSortingFilterVal, searchValue, onChangeSearchValue}) => {
    const context = useContext(IntlContext);
    const dispatch = useDispatch();
    
    return (
        <Row className="mb-4" dir={context.state.locale === "sa" && "rtl"}>
          <Col xs={12} md={12} lg={12} className="mb-3">
            <h2>
              {selectedTab === "all-product" ? (
                <FormattedMessage id={"Souvenirs"} />
              ) : (
                <FormattedMessage id={"Printable Souvenirs"} />
              )}
            </h2>
          </Col>
          <Col
            md={12}
            className="d-flex justify-content-center mb-4"
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
          <Col xs={12} md={3} className="desktop-wrap">
            <TextField label="Search" variant="outlined" size="small" className='w-100' searchValue={searchValue} onChange={e => onChangeSearchValue(e.target.value)} />
          </Col>
          <Col xs={12} md={3} className="desktop-wrap">
            {SelectCategory()}
          </Col>
          <Col xs={12} md={3} className="desktop-wrap">
          {SelectBrand()}
          </Col>
          
          {isMobile && selectedTab === "printable" ? (
            <div />
          ) : (
            <>
            <Col xs={12} md={3} className="mbl-wrap mb-4">
            <TextField label="Search" variant="outlined" size="small" className='w-100 search-field' searchValue={searchValue} onChange={e => onChangeSearchValue(e.target.value)} />
          </Col>
              <Col xs={12} md={3} className="mbl-wrap mb-4">
                {SelectCategory()}
              </Col>
              <Col xs={12} md={3} className="mbl-wrap mb-4">
                {SelectBrand()}
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
