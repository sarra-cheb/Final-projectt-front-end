import React from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, Icon, PreviewCard } from "../../components/Component";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState('');
  const toggleModal = () => {
    setModal(!modal)
  }

  const forgetpass = async () => {
    try {
      const data = { Email: email };
      await axios.post('http://localhost:4000/api/forgotPassword', data);
    } catch (error) {
      console.log(error);
      alert('Server error! Please try again later');
    }
  }
  const saveNewPassword = async () => {
    try {
      const data = { Password: password, Code: code };
      await axios.post('http://localhost:4000/api/resetPassword', data);
      toggleModal();
    } catch (error) {
      console.log(error);
      alert('Server error!! Please try again later');
    }
  }
  return (
    <React.Fragment>
      <Head title="Forgot-Password" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h5">Reset password</BlockTitle>
                <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="default-01"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary" size="lg" className="btn-block mb-3" onClick={forgetpass}>
                  Send Reset Link
                </Button>
              </FormGroup>
            </form>
            <p className="text-danger">If you received an email click here</p>
            <Button color="primary" size="lg" className="btn-block" onClick={toggleModal}> Reset Password
            </Button>
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal} close={
                <button className="close" onClick={toggleModal}>
                  <Icon name="cross" />
                </button>
              }
              >
                make a new password
              </ModalHeader>
              <ModalBody>
                <form onSubmit={saveNewPassword}>
                  <FormGroup>
                    <label className="form-label" htmlFor="password">
                      New Password
                    </label>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="text"
                        id="password"
                        name="passcode"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className='form-control-lg form-control'
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <label className="form-label" htmlFor="name">
                      Code
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="code"
                        name="code"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        placeholder="Enter the code received on your email "
                        className="form-control-lg form-control"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" type="submit" size="lg">
                      Save New Password
                    </Button>
                  </FormGroup>
                </form>
              </ModalBody>
              <ModalFooter className="bg-light">
                <span className="sub-text">Modal Footer Text</span>
              </ModalFooter>
            </Modal>
            <div className="form-note-s2 text-center pt-4">
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Return to login</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment >
  );
};
export default ForgotPassword;
