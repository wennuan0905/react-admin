import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import {
  Form,
  Input,
  Select,
} from 'antd';
const Item = Form.Item
const Option = Select.Option
class AddForm extends Component {
 
  render() {
    // const {getFieldDdcorato} =this.props.from

    return (
      <Form >
        <Item >
         
            <Select defaultValue={'一级分类'}>
             <Option value="0">一级分类</Option>
             
             <Option value="1">xiezi</Option>
           </Select>
         
         
        </Item>
        <Item label="Input">
          <Input />
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);