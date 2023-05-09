import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = ({ history }) => {

  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [values, setValues] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
    Adress: "",
    role: ""
  }
  )


  const handleFormSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/register', values);

      alert(response.data.message);
      setLoading(true);
      setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-success`), 2000);
    } catch (error) {
      alert('server error or your email already used please verify!')
    }
  };
  return (

    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create New Dashlite Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setValues({ ...values, Name: e.target.value })}
                    value={values.Name}
                    placeholder="Enter your name"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="email"
                    bssize="lg"
                    id="default-01"
                    name="email"
                    value={values.Email}
                    onChange={(e) => setValues({ ...values, Email: e.target.value })}
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    value={values.Password}
                    onChange={(e) => setValues({ ...values, Password: e.target.value })}
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="phone">
                  Phone
                </label>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={values.Phone}
                    onChange={(e) => setValues({ ...values, Phone: e.target.value })}
                    placeholder="Enter your number"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  />
                  {errors.phone && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="adress">
                  Adress
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="adress"
                    name="adress"
                    value={values.Adress}
                    onChange={(e) => setValues({ ...values, Adress: e.target.value })}
                    placeholder="Enter your adress"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  />
                  {errors.adress && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <div className="form-control-wrap">
                  <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={(e) => setValues({ ...values, role: e.target.value })}
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  >
                    <option value="">-- Select a role --</option>
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-8">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
