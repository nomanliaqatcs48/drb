import React, { useState, useEffect, useRef } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ReactCountryFlag from "react-country-flag";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/user";

const LanguageDropdown = ({lightColor}: {lightColor: boolean}) => {
  const dispatch: any = useDispatch();
  const { userInfo } = useSelector((state: any) => state.user);
  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);



  return (
    <ul className="w-100 text-end">
      <IntlContext.Consumer>
        {(context) => {
          let langArr: any = {};
          langArr = {
            en: <FormattedMessage id={"English"} />,
            sa: <FormattedMessage id={"Arabic"} />,
          };
          return (
            <>
              <button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={`lang-btn ${lightColor ? "btn-light-border" : "btn-black-border"}`}
              >
                 <ReactCountryFlag
                    className="country-flag"
                    countryCode={
                      context.state.locale === "en"
                        ? "us"
                        : context.state.locale
                    }
                    style={{
                        fontSize: '1.2em',
                    }}
                    svg
                  />
                  {/* <span className={context.state.locale === "sa" ? "mr-1" : "ml-1"}>
                    {langArr[context.state.locale]}
                  </span> */}
              </button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom"
                transition
                disablePortal
                className="mt-1"
                style={{zIndex: 10000}}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: "center bottom",
                    }}
                  >
                    <Paper style={{marginTop: -3}}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                          onClick={(e)=> {
                            context.switchLanguage("en"); 
                            handleClose(e);
                            var formData = new FormData();
                            formData.append("lang", 'en');
                            dispatch(updateUser(formData, 'dropdown'));
                            }}
                          >
                            <ReactCountryFlag
                              className="country-flag"
                              countryCode="us"
                              svg
                            />
                            {/* <span className={context.state.locale === "sa" ? "mr-1" : "ml-1"}>
                              <FormattedMessage id={"English"} />
                            </span> */}
                          </MenuItem>
                          <MenuItem onClick={(e)=> {
                            context.switchLanguage("sa"); 
                            handleClose(e);
                            var formData = new FormData();
                            formData.append("lang", 'sa');
                            dispatch(updateUser(formData, 'dropdown'));
                            }}>
                            <ReactCountryFlag
                              className="country-flag"
                              countryCode="sa"
                              svg
                            />
                            {/* <span className={context.state.locale === "sa" ? "mr-1" : "ml-1"}>
                              <FormattedMessage id={"Arabic"} />
                            </span> */}
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          );
        }}
      </IntlContext.Consumer>
    </ul>
  );
};

export default LanguageDropdown;
