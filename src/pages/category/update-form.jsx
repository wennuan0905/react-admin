import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Icon } from "antd";
class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  };
  componentWillMount() {
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName,
            rules: [{ required: true, message: "Please input your username!" }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
