import React, { Component } from "react";
import { Button, Card, Icon, Table, Modal } from "antd";
import { reqCategorys, reqUpdateCategory ,reqAddCategory} from "../../api";
import UpdateForm from "./update-form";
import AddForm from "./add-form";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [], //一级分类数组
      subCategorys: [], // 二级分类数组
      parentId: "0", //分类id   0表示一级分类
      parentName: "", // 分类名称
      visible: 0,
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
              <span onClick={() => this.showUpdate(category)}>修改分类</span>{" "}
              &nbsp;&nbsp;&nbsp;
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
  // 关闭弹框
  handleCancel = () => {
    this.setState({
      visible: 0,
    });
  };
  // 添加分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 隐藏确认框
        this.setState({
          visible: 0
        })

        // 收集数据, 并提交添加分类的请求
        const {parentId, categoryName} = values
        // 清除输入数据
        this.form.resetFields()
        const result = await reqAddCategory(categoryName, parentId)
        if(result.status===0) {

          // 添加的分类就是当前分类列表下的分类
          if(parentId===this.state.parentId) {
            // 重新获取当前分类列表显示
            this.getCategorys()
          } else if (parentId==='0'){ // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
            this.getCategorys('0')
          }
        }
      }
    })
  }
  // 修改分类弹框
  showUpdate = (category) => {
    this.category = category;
    this.setState({
      visible: 2,
    });
  };
  // 修改分类
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          visible: 0,
        });
        const categoryId = this.category._id;
        const { categoryName } = values;
        this.form.resetFields();
        const result = await reqUpdateCategory({ categoryId, categoryName });
        console.log(result);
        if (result.status === 0) {
          this.getCategorys();
        }
      }
    });
  };
  render() {
    const {
      categorys,
      parentId,
      subCategorys,
      parentName,
      visible,
    } = this.state;
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
        <Button
          type="primary"
          onClick={() => {
            this.setState({
              visible: 1,
            });
          }}
        >
          <Icon type="plus" />
          添加
        </Button>
      </span>
    );
    const category = this.category || "";
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          pagination={{
            defaultPageSize: 2,
          }}
        />
        <Modal
          title="添加分类"
          visible={visible == 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            parentId={parentId}
            categorys={categorys}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
        <Modal
          title="修改分类"
          visible={visible == 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
