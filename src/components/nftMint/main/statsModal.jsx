import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import cross from "../../../assets/cross.svg";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";

const StatsModal = React.memo(
  ({ modalType, onCloseModal, statsValues, setStatsValues }) => {
    const context = useContext(IntlContext)

    const [stats, setStats] = useState(statsValues);

    useEffect(() => {
      setStats({ ...statsValues });
    }, [statsValues]);

    const addNewVal = () => {
      if (modalType === "properties") {
        stats[modalType] = stats.properties.concat({
          trait_type: "",
          value: "",
        });
      } else {
        stats[modalType] = stats[modalType].concat({
          trait_type: "",
          value: 3,
          secondVal: 5,
        });
      }
      setStats({ ...stats, [modalType]: stats[modalType] });
    };

    const handleChange = ({ name, value, index }) => {
      stats[modalType][index][name] = value;

      setStats({ ...stats, [modalType]: stats[modalType] });
    };

    const removeItem = (index) => {
      stats[modalType].splice(index, 1);
      if (stats.properties.length === 0) {
        stats[modalType] = stats.properties.concat({
          trait_type: "",
          value: "",
        });
      } else if (stats.levels.length === 0 || stats.stats.length === 0) {
        stats[modalType] = stats[modalType].concat({
          trait_type: "",
          value: 3,
          secondVal: 5,
          ...(stats.stats.length === 0 && { display_type: "number" }),
        });
      }
      setStats({ ...stats });
    };

    const onSave = () => {
      setStatsValues(modalType, stats[modalType]);
      onCloseModal();
    };

    return (
      <Modal
        show={modalType ? true : false}
        onHide={() => {}}
        centered
        className={styles.modal_wrap}
      >
        <Modal.Body>
          <Container dir={context.state.locale === "sa" ? "rtl" : "ltr"}>
            <h3>
             <FormattedMessage id="Add" />{" "}
              {modalType === "properties"
                ? <FormattedMessage id="Properties" />
                : modalType === "levels"
                ? <FormattedMessage id="Levels" />
                : modalType === "stats" && <FormattedMessage id="Stats" />}
            </h3>
            <div className={styles.cross} style={context.state.locale === "sa" ? {top: -8, right: 11}: {}} onClick={onCloseModal}>
              <img src={cross} alt="cross" />
            </div>
            <div>
              <p className={styles.content}>
                {modalType === "properties"
                  ? <FormattedMessage id="Properties" />
                  : modalType === "levels"
                  ? <FormattedMessage id="Levels" />
                  : modalType === "stats" && <FormattedMessage id="Stats" />}{" "}
                <FormattedMessage id="show up underneath your item, are clickable, and can be filtered
                in your collection's sidebar." />
              </p>
            </div>
            <Row>
              {modalType === "properties"
                ? stats.properties.map((property, index) => (
                    <>
                      <Col md={5}>
                        <Form.Group className="mb-3" x>
                          <Form.Label>
                            <strong><FormattedMessage id="Type" /></strong>
                          </Form.Label>
                          <Form.Control
                            size="lg"
                            type="text"
                            placeholder= {context.state.locale === "sa" ? "شخصية": "Character"}
                            name="trait_type"
                            style={{ width: "100%" }}
                            value={property.trait_type}
                            onChange={(e) =>
                              handleChange({
                                name: "trait_type",
                                value: e.target.value,
                                index,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <strong>{<FormattedMessage id="Name" />}</strong>
                          </Form.Label>
                          <Form.Control
                            size="lg"
                            value={property.value}
                            type="text"
                            placeholder={context.state.locale === "sa" ? "ذكر" : "Male"}
                            name="value"
                            onChange={(e) =>
                              handleChange({
                                name: "value",
                                value: e.target.value,
                                index,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col
                        md={1}
                        style={{ marginTop: "2.3rem", cursor: "pointer" }}
                      >
                        <BackspaceIcon
                          fontSize="large"
                          onClick={() => removeItem(index)}
                        />
                      </Col>
                    </>
                  ))
                : stats[modalType].map((item, index) => (
                    <>
                      <Col md={5}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <strong>{<FormattedMessage id="Name" />}</strong>
                          </Form.Label>
                          <Form.Control
                            size="lg"
                            type="text"
                            placeholder={context.state.locale === "sa" ? "سرعة" : "Speed"}
                            className="w-100"
                            value={item.trait_type}
                            onChange={(e) =>
                              handleChange({
                                name: "trait_type",
                                value: e.target.value,
                                index,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <strong><FormattedMessage id="Value" /></strong>
                          </Form.Label>
                          <div className="d-flex">
                            <Form.Control
                              size="lg"
                              type="number"
                              name="value"
                              value={item.value}
                              onChange={(e) =>
                                handleChange({
                                  name: "value",
                                  value: e.target.value,
                                  index,
                                })
                              }
                            />
                            <Form.Control
                              size="lg"
                              style={{ textAlign: "center" }}
                              type="text"
                              value={"of"}
                              readOnly={true}
                            />
                            <Form.Control
                              size="lg"
                              min={0}
                              type="number"
                              value={item.secondVal}
                              onChange={(e) =>
                                handleChange({
                                  name: "secondVal",
                                  value: e.target.value,
                                  index,
                                })
                              }
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col
                        md={1}
                        style={{ marginTop: "2.3rem", cursor: "pointer" }}
                      >
                        <BackspaceIcon
                          fontSize="large"
                          onClick={() => removeItem(index)}
                        />
                      </Col>
                    </>
                  ))}

              <Col md={4}>
                {/* <Button variant="outlined" size="large">Add more</Button> */}
                <button
                  style={{ fontSize: 16 }}
                  className={styles.addBtn}
                  onClick={addNewVal}
                >
                 <FormattedMessage id="Add more" />
                </button>
              </Col>

              <Col md={12} className="mt-2">
                <hr />
                <Button
                  variant="contained"
                  className="w-100"
                  size="large"
                  onClick={() => onSave()}
                >
                 <FormattedMessage id="Save" />
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
);

export default StatsModal;
