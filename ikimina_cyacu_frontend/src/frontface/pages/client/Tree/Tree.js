import { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";
import printIcon from "../../../../assets/print_32px.png";
import OrganizationChart from "@dabeng/react-orgchart";
import UserCard from "./UserCard";
import MemberNode from "./MemberNode";
import "./index.css";
import AppLayout from "../../../layouts/AppLayout";
import MemberService from "../../../../service/members.service";
import UtilServices from "../../../../service/util.service";
import { Link } from "react-router-dom";
import { reverse } from "named-urls";
import RoutesName from "../../../../app/routes";
import "react-phone-input-2/lib/style.css";

export const TreeView = () => {
  const print = () => {
    window.print();
  };
  const orgchart = useRef();
  const initialInputState = {
    firstName: "",
    lastName: "",
    parentMemberId: "",
    phoneNumber: "",
  };
  const [rawMembers, setRawMembers] = useState({});
  const [afterRegister, setAfterRegister] = useState({});
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [filename, setFilename] = useState("ikimina_document");

  const loadMembers = () => {
    MemberService.getAllMembers().then((res) => {
      const [processedData] = UtilServices.processData(res.data);
      setRawMembers(processedData);
    });
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  const handleSearch = (e) => {
    const { searchQuery } = eachEntry;
    MemberService.searchMember(searchQuery)
      .then((res) => {
        const [processedData] = UtilServices.processData(res.data);
        setRawMembers(processedData);
      })
      .catch((err) => console.error(err, err));
  };
  const handleSubmit = (e) => {
    setIsLoading(true);
    const { firstName, lastName, parentMemberId, phoneNumber } = eachEntry;
    MemberService.register(firstName, lastName, parentMemberId, phoneNumber)
      .then((newMember) => {
        setIsLoading(false);
        setShow(false);
        setAfterRegister(newMember.data);
        setModalShow(true);
        loadMembers();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const exportTo = () => {
    setFilename(...(filename + Date().toString()));
    orgchart.current.exportTo(filename, "pdf");
  };

  return (
    <AppLayout>
      <section className="tree-slide no-printme">
        <>
          <Row>
            <Col lg={12} className="">
              <br />
              <Row className="justify-content-center">
                <Col lg={4} md={4} sm={4}>
                  <p className="mt-2 ml-5 mb-0 title text-capitalize text-bold">
                    <Link to={reverse(RoutesName.home)}>| Membership Tree</Link>
                  </p>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <Row className="justify-content-center">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Form className="mt-0">
                      <div className=" row no-gutters mb-1">
                        <div className="col">
                          <Form.Control
                            type="search"
                            placeholder="Telephone/Code"
                            className="form-control-lg "
                            name="searchQuery"
                            onChange={handleInputChange}
                            style={{ textAlign: "center", fontSize: "13px" }}
                          />
                        </div>
                        <div className="col-auto">
                          <Button
                            className=" mt-0 mb-0 title text-capitalize "
                            type="button"
                            variant="primary"
                            onClick={handleSearch}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </Row>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <Row>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      className=" mt-0 mb-0 title text-capitalize "
                      type="submit"
                      variant="primary"
                      onClick={handleShow}
                    >
                      Register
                    </Button>
                    <Link className="">
                      &nbsp;
                      <img src={printIcon} alt="Print all" onClick={exportTo} />
                    </Link>
                  </Row>
                </Col>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title
                      className=" mt-0 mb-0 title text-capitalize"
                      style={{ fontSize: "14px" }}
                    >
                      | Membership registration form
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Col lg={12} className="FormPadding ">
                      <Form className="mt-0">
                        <Col>
                          <Col lg={12} xs={12} className="mt-1">
                            <Form.Control
                              type="text"
                              id="fname"
                              name="firstName"
                              onChange={handleInputChange}
                              placeholder="First Name"
                              disabled={isLoading}
                              autoFocus={true}
                            />
                          </Col>
                          <Col lg={12} xs={12} className="mt-2">
                            <Form.Control
                              type="text"
                              id="sname"
                              name="lastName"
                              onChange={handleInputChange}
                              disabled={isLoading}
                              placeholder="Sur Name"
                            />
                          </Col>
                          <Col lg={12} xs={12} className="mt-2">
                            <Form.Control
                              type="number"
                              id="tel"
                              name="phoneNumber"
                              onChange={handleInputChange}
                              disabled={isLoading}
                              placeholder="Telephone"
                            />
                          </Col>
                          <Col lg={12} xs={12} className="mt-2">
                            <Form.Control
                              type="text"
                              id="orientation"
                              name="parentMemberId"
                              onChange={handleInputChange}
                              disabled={isLoading}
                              placeholder="Orientation"
                            />
                          </Col>
                          <Form.Row>
                            <Col lg={6} xs={12}>
                              {!isLoading && (
                                <Button
                                  className="btn-block py-2 mt-4"
                                  style={{ fontSize: "14px" }}
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                              )}
                            </Col>
                            <Col lg={6} xs={12}>
                              <Button
                                variant="primary"
                                onClick={handleSubmit}
                                className="btn-block py-2 mt-4"
                                style={{ fontSize: "14px" }}
                              >
                                {isLoading ? (
                                  <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></Spinner>
                                ) : (
                                  <>
                                    <i className="fa fa-check-circle"></i> Save
                                  </>
                                )}
                              </Button>
                            </Col>
                          </Form.Row>
                          <Row className="mt-3"></Row>
                        </Col>
                      </Form>
                    </Col>
                  </Modal.Body>
                </Modal>
              </Row>
              {/* <p className="border-bottom mt-2 mb-0"></p> */}
              <>
                <div className="mb-4 chart_width">
                  <OrganizationChart
                    ref={orgchart}
                    datasource={rawMembers}
                    chartClass="myChart"
                    zoom={true}
                    pan={true}
                    zoomoutLimit={0.2}
                    NodeTemplate={MemberNode}
                  />
                </div>
              </>
            </Col>
          </Row>
          {/* Modal Preview */}

          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            keyboard={false}
            backdrop="static"
            centered
            className="printme"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <UserCard userData={afterRegister} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={print}>Print</Button>
            </Modal.Footer>
          </Modal>

          {/* End of Modal Preview */}
        </>
      </section>
    </AppLayout>
  );
};
