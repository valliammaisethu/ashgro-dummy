import { Space, Col, Row } from "antd";
import { Form, Formik } from "formik";
import React, { FC, useState } from "react";
import InputField from "../../shared/components/InputField";
import Tooltip from "../../shared/components/Tooltip";
import Timeline from "../../shared/components/Timeline";
import Tabs from "../../shared/components/Tabs";
import { INPUT_TYPE } from "../../enums/inputType";
import Switch from "../../shared/components/Switch";
import "./appComponents.scss";
import DatePicker from "../../shared/components/DatePickerField";
import Dropdown from "../../shared/components/DropdownField";
import { Gender } from "../../enums/genders.enum";
import { tooltipPosition } from "../../enums/tooltipPosition";
import Drawer from "../../shared/components/Drawer";
import BreadCrumb from "../../shared/components/BreadCrumb";
import Accordion from "../../shared/components/Accordion";
import SearchField from "../../shared/components/SearchField";
import CustomAvatar from "../../shared/components/CustomAvatar";
import FileUpload from "../../shared/components/FileUpload";
import DeleteModal from "../../shared/components/DeleteModal";
import Modal from "../../shared/components/Modal";
import Loader from "../../shared/components/Loader";
import Checkbox from "../../shared/components/Checkbox";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
// import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { InboxOutlined } from "@ant-design/icons";
import Table from "../../shared/components/Table";
import Stepper from "../../shared/components/Stepper";
import Skeleton from "../../shared/components/Skeleton";
import Radio from "../../shared/components/Radio";
import Button from "../../shared/components/Button";
import DropdownField from "../../shared/components/DropdownField";
import { AppComponentsConstants } from "../../constants/appComponents";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import StripePayment from "../../shared/components/StripePayment";
import RadioButton from "../../shared/components/Radio";

// const stripePromise = loadStripe(
//   import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? ""
// );

const AppComponents: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState(true);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [radio, setRadio] = useState<string | number>();
  const [searchValue, setSearchValue] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // const handleCheckboxGroup = (e: CheckboxValueType[]) => {
  //   setCheckedList(e as string[]);
  //   console.log(e);
  // };

  const handleCheckbox = (e: CheckboxChangeEvent) => {
    setChecked((prevState) => !prevState);
    // console.log(e.target.checked);
  };

  const modalFooter = [
    <Button key="back" clickHandler={handleCloseModal}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" clickHandler={handleCloseModal}>
      Submit
    </Button>,
  ];
  const OpenCloseDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const activeKeyChanged = (key: string | string[]) => {
    // TODO: implement this function
  };

  return (
    <div className="app-components">
      <h1 className="text-center text-decoration">App Components</h1>
      <Formik
        initialValues={{ startDate: "", gender: "", otp: "", framework: "" }}
        onSubmit={() => {
          // TODO: implement this function
        }}
      >
        <Form>
          <Space direction="vertical">
            <Row className="app-components" align="top" gutter={[24, 24]}>
              <Col span={8}>
                <p className="app-components__title">Drawer: </p>
                <Drawer
                  closable={true}
                  onClose={OpenCloseDrawer}
                  open={isDrawerOpen}
                  placement="left"
                  title="Menu"
                >
                  <p>This is the drawer</p>
                </Drawer>
                <Button clickHandler={OpenCloseDrawer}>Open</Button>
              </Col>
              <Col span={8}>
                <p className="app-components__title">Tooltip: </p>
                <Space>
                  <Tooltip
                    title="This is a tooltip"
                    placement={tooltipPosition.BOTTOM}
                  >
                    <Button>Hover</Button>
                  </Tooltip>
                </Space>
              </Col>

              <Col span={8}>
                <p className="app-components__title">Switch: </p>
                <Switch />
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Button: </p>
                <Row>
                  <Col span={8}>
                    <Button type="primary">Primary Button</Button>
                  </Col>
                  <Col span={8}>
                    <Button type="default">Default Button</Button>
                  </Col>
                  <Col span={8}>
                    <Button loading type="primary">
                      Loading Button
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Search: </p>
                <SearchField
                  setSearchValue={setSearchValue}
                  searchValue={searchValue}
                  onSearch={() => {
                    // TODO: implement this function
                  }}
                />
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Input: </p>

                <InputField
                  type={INPUT_TYPE.TEXT}
                  name="input"
                  placeholder="Enter some text"
                />
                <DatePicker.Formik name="startDate" />
                <Dropdown.Formik
                  name="gender"
                  placeholder="Choose Gender"
                  options={[
                    { label: "Male", value: Gender.MALE },
                    { label: "Female", value: Gender.FEMALE },
                  ]}
                />
                {/* <OTPField.Formik name="otp" /> */}
                <RadioButton.Formik
                  name="framework"
                  options={[
                    { label: "React", value: "react" },
                    { label: "Angular", value: "angular" },
                  ]}
                  label="Category"
                />
                <div className="mt-5">
                  <Button type="primary" className="mr-4">
                    Primary Button
                  </Button>
                  <Button>Default Button</Button>
                </div>
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Select: </p>

                <DropdownField
                  name="select"
                  options={AppComponentsConstants.OPTIONS}
                  onChange={(value) => {
                    // TODO: implement this function
                  }}
                  placeholder={"Select"}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">
                  Select (Multiple):{" "}
                </p>

                <DropdownField
                  name="select"
                  options={AppComponentsConstants.OPTIONS}
                  mode={"multiple"}
                  onChange={(value) => {
                    // TODO: implement this function
                  }}
                  placeholder={"Select"}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Avatar: </p>

                <Row>
                  <Col span={8}>
                    <p>Small</p>

                    <CustomAvatar name="Joe Pelz" size="small" />
                  </Col>
                  <Col span={8}>
                    <p>Large</p>
                    <CustomAvatar name="Tanya Cruz" size="large" />
                  </Col>
                  <Col span={8}>
                    <p>Unnamed</p>
                    <CustomAvatar name="" size="large" />
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">File upload:</p>
                <FileUpload
                  handleChange={(value) => {
                    // TODO: implement this function
                  }}
                >
                  <Button>Upload File</Button>
                </FileUpload>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Drag and Drop:</p>
                <FileUpload
                  dragdrop
                  handleChange={(values) => {
                    // console.log(values);
                  }}
                  uploadIcon={<InboxOutlined />}
                  uploadText={
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  }
                ></FileUpload>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Modal:</p>
                <Modal
                  closeModal={handleCloseModal}
                  visible={isModalOpen}
                  title="Modal"
                  handleOk={handleCloseModal}
                  footer={modalFooter}
                >
                  This is the Modal body
                </Modal>
                <Button clickHandler={handleOpenModal}>Open</Button>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Delete Modal:</p>
                <DeleteModal
                  resource="component"
                  description="I recommend not to delete it though :("
                >
                  <Button>Delete</Button>
                </DeleteModal>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Loader:</p>
                <Loader tip="Loading.." />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Checkbox:</p>
                <Checkbox
                  checked={checked}
                  onChange={(event) => event && handleCheckbox(event)}
                >
                  Checkbox
                </Checkbox>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Checkbox Group:</p>
                <Checkbox
                  group
                  options={AppComponentsConstants.OPTIONS}
                  onChange={(_, event) => event} //handleCheckboxGroup(event)}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Radio:</p>

                <Radio
                  options={AppComponentsConstants.OPTIONS}
                  value={radio}
                  name="radio"
                  onChange={(event) => {
                    setRadio(event.target.value);
                  }}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Skeleton:</p>
                <Skeleton />
              </Col>

              <Col span={11}>
                <p className="mt-5 app-components__title">Tabs: </p>
                <Tabs items={AppComponentsConstants.TABS} />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <p className="mt-5 app-components__title">Breadcrumb: </p>
                <BreadCrumb params={AppComponentsConstants.BREADCRUMB_PARAMS} />
              </Col>
              <Col span={11}>
                <p className="mt-5 app-components__title">Accordion: </p>
                <Accordion
                  defaultActiveKey="2"
                  accordionList={AppComponentsConstants.LIST}
                  onChange={activeKeyChanged}
                />
              </Col>
              <Col span={2} />

              <Col span={11}>
                <p className="mt-5 app-components__title">Timeline: </p>
                <Timeline items={AppComponentsConstants.TIMELINE_ITEMS} />
              </Col>

              <Col span={24}>
                <p className="mt-5 app-components__title">Steps:</p>
                <Stepper items={AppComponentsConstants.STEPPER_ITEMS} />
              </Col>
              <Col span={24}>
                <p className="mt-5 app-components__title">Table:</p>
                <Table
                  columns={AppComponentsConstants.TABLE.COLUMS}
                  dataSource={AppComponentsConstants.TABLE.DATA}
                />
              </Col>
              <Col span={24}>
                <Row align="middle" justify="center">
                  <Col span={10}>
                    {/* <h3>Stripe Payment:</h3>
                    <Elements stripe={stripePromise}>
                      <StripePayment />
                    </Elements> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Space>
        </Form>
      </Formik>
    </div>
  );
};

export default AppComponents;
