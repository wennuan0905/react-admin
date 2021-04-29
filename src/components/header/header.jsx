import React, { Component } from "react";
import "./header.css";
import { Button, Modal } from "antd";
import { withRouter } from "react-router-dom";
import { formatData } from "../../utils/dataUtils";
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils";

const { confirm } = Modal;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: formatData(Date.now()),
    };
  }
  componentDidMount() {
    this.getTime();
  }
  // 当前的时间
  getTime = () => {
    setInterval(() => {
      const currentTime = formatData(Date.now());
      this.setState({
        currentTime: currentTime,
      });
    }, 1000);
  };
  // 当前的位置
  getTitle = () => {
    const path = this.props.location.pathname;
    let title;
    // 循环菜单
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) == 0
        );
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  // 退出登录
  loginout = () => {
    Modal.confirm({
      content: "确定退出吗?",
      onOk: () => {
        console.log("OK", this);
        // 删除保存的user数据
        storageUtils.removeUser();
        // 跳转到login
        this.props.history.replace("/login");
      },
    });
  };
  render() {
    const { currentTime } = this.state;
    const title = this.getTitle();
    return (
      <div className="header">
        <span>当前的时间:{currentTime}</span>
        <span>当前的位置是:{title} </span>
        <Button type="primary" onClick={this.loginout}>
          退出登录
        </Button>
      </div>
    );
  }
}

export default withRouter(Header);
