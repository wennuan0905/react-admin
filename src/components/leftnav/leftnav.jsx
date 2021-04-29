import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon, Button } from "antd";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;
class Leftnav extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  getMenunodes = (menuList) => {
    const path = this.props.location.pathname; //获取当前的路径
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 获取当前的路径，然后循环遍历item.children，如果找到有，获取当前item.children的父元素的key值
        const cItem = item.children.find((cItem) => cItem.key == path); //循环item.children，需要找一下有没有当前路径对应的项，如果找到
        // 说明需要展开这个子菜单的父菜单
        // 如果有下拉菜单（二级路由）
        if (cItem) {
          this.openKey = item.key; // 把找到的父元素的key保存在openKey中
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenunodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  componentDidMount() {
    // console.log(this.getMenunodes(menuList));
  }
  componentWillMount() {
    // 在页面渲染之前就已经拿到数据了，这时候的openKey是可以使用的
    this.getNodes = this.getMenunodes(menuList);
  }
  render() {
    //   获取到当前路由的路径名字

    const path = this.props.location.pathname;
    const openKey = this.openKey;
    console.log(path);
    return (
      <div style={{ width: "100%" }}>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {/* {this.getMenunodes(menuList)} */}
          {this.getNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Leftnav);
