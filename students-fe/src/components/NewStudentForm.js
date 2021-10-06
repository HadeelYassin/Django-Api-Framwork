import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewStudentForm extends React.Component {
    state = {
        pk: 0,
        name: "",
        email: "",
        document: "",
        phone: "",
        errors: []
    };

    componentDidMount() {
        if (this.props.student) {
            const { pk, name, document, email, phone } = this.props.student;
            this.setState({ pk, name, document, email, phone });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createStudent = e => {
        e.preventDefault();
        axios.post(API_URL, {
            name: this.state.name, email: this.state.email,
            document: this.state.document, phone: this.state.phone
        })
            .then((res) => {
                console.log(res)
                this.props.resetState();
                this.props.toggle();
            })
            .catch((error) => {


                const errorResponse = error.response.data; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key])
                }
                console.log(errorArr)





            });

    };

    editStudent = e => {
        e.preventDefault();
        axios.put(API_URL + this.state.pk, this.state)
            .then(() => {
                this.props.resetState();
                this.props.toggle();
            })
            .catch((error) => {

                console.log(error)

            });;
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form onSubmit={this.props.student ? this.editStudent : this.createStudent}>

                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.name)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.email)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="document">Document:</Label>
                    <Input
                        type="text"
                        name="document"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.document)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone:</Label>
                    <Input
                        type="text"
                        name="phone"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.phone)}
                    />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
    }
}

export default NewStudentForm;