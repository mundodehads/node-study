import React, { Component } from "react"
import { navigate } from "gatsby"
import { Form, Button, Modal } from "react-bootstrap"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNewAccountSubmit = this.handleNewAccountSubmit.bind(this);

    this.state = {
      show: false,
    };
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    const email = event.target["0"].value;
    const password = event.target["1"].value;

    console.log({ email, password });

    axios
      .post(
        `${process.env.API_BASEPATH}/auth/login`,
        { email, password },
      )
      .then(({ data }) => {
        const { token, userId } = data;
        navigate(
          "/projects",
          {
            state: {
              token,
              user: email,
              userId,
            },
          }
        );
      })
      .catch((error) => {
        alert(error.response ? JSON.stringify(error.response.data) : JSON.stringify(error));
      })
  }

  handleNewAccountSubmit(event) {
    event.preventDefault();

    const email = event.target["0"].value;
    const password = event.target["1"].value;

    console.log({ email, password });

    axios
      .post(
        `${process.env.API_BASEPATH}/auth/`,
        { email, password },
      )
      .then(({ data }) => {
        const { token, userId } = data;
        this.handleClose();
        navigate(
          "/projects",
          {
            state: {
              token,
              user: email,
              userId,
            },
          }
        );
      })
      .catch((error) => {
        alert(error.response ? JSON.stringify(error.response.data) : JSON.stringify(error));
      })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Layout>
          <SEO title="Login" />
          <div style={{
            margin: "auto",
            width: "50%",
            padding: "70px 0",
          }}>
            <Form onSubmit={this.handleLoginSubmit}>
              <Form.Group controlId="formLoginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="secondary" type="submit">
                Login
              </Button>
              <Form.Group controlId="formLoginCreateAccount">
                <Form.Text className="text-muted" onClick={this.handleShow} >
                  <a href="#">Create an account</a>
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        </Layout>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleNewAccountSubmit}>
              <Form.Group controlId="formCreateAccountEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formCreateAccountPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="secondary" type="submit">
                Create Account
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default IndexPage
