import React, { Component } from "react";
import { Button, Card, Icon, Table } from "antd";
import { reqCategorys } from "../../api";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [], //一级分类数组
      subCategorys: [], // 二级分类数组
      parentId: "0", //分类id   0表示一级分类
      parentName: "", // 分类名称
    };
    // this.getCategorys = this.getCategorys.bind(this)
  }
  componentWillMount() {
    this.initColumn();
  }
  initColumn() {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        render: (category) => {
          return (
            <span>
              <span>修改分类</span> &nbsp;&nbsp;&nbsp;
              {this.state.parentId === "0" ? (
                <span onClick={() => this.showSubCategorys(category)}>
                  查看子分类
                </span>
              ) : null}
            </span>
          );
        },
      },
    ];
  }
  // 获取分类列表  传参，传0的话表示一级分类，传_id表示对应的分类
  getCategorys = async () => {
    const { parentId } = this.state;
    const result = await reqCategorys(parentId);
    console.log(result);
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId == "0") {
        this.setState({
          categorys,
        });
      } else {
        this.setState({
          subCategorys: categorys,
        });
      }
    }
  };
  // 获取二级分类列表
  showSubCategorys = (categorys) => {
    this.setState(
      {
        parentId: categorys._id,
        parentName: categorys.name,
      },
      () => {
        this.getCategorys();
      }
    );
  };
  // 点击一级分类修改状态
  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };
  componentDidMount() {
    // 这个生命周期用于调用接口
    this.getCategorys();
  }
  render() {
    const { categorys, parentId, subCategorys, parentName } = this.state;
    const title =
      parentId === "0" ? (
        "一级分类"
      ) : (
        <span>
          <span onClick={this.showCategorys}>一级分类</span> ----
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <span>
        <Button type="primary">
          <Icon type="plus" />
          添加
        </Button>
      </span>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
        />
      </Card>
    );
  }
}

export default Category;