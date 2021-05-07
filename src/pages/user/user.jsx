import React, { Component } from "react";
import { Button, Card,Table, Divider, Tag } from "antd";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  initColumns=()=>{
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>Invite {record.name}</a>
            <Divider type="vertical" />
            <a>Delete</a>
          </span>
        ),
      },
    ];
    
  }
  componentWillMount(){
    this.initColumns()
  }
  render() {
    const title=<Button type="primary">添加用户</Button>
    return (
      <Card title={title} >
       <Table columns={this.columns} dataSource={this.data} />
      </Card>
    );
  }
}

export default User;
