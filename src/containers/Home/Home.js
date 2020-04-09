import React from 'react';
import { createHashHistory } from 'history';
import { Button, Modal, Row, Col, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { POBrowser } from '../../utils/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdminAction } from '../../reducers/index';
import './style.css';

const { confirm } = Modal;
const history = createHashHistory();
/**
 * 退出系统
 */
const quitHandler = () => {
    confirm({
        title: "确认退出系统？",
        icon: <ExclamationCircleOutlined />,
        content: "点击确认将退出系统，返回到登录页面。是否确认退出系统？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
            localStorage.clear();
            history.push("/login");
        }
    });

};
/**
 * 进入后台
 */
const intoAdmin = () => {
    history.push("/admin");
};

/**
 * 打开PageOffice
 */
const openWindowModeless = () => {
    POBrowser.openWindowModeless('http://172.16.30.3/showWord', 'fullscreen=yes;');
};

/**
 * 渲染函数
 */
function Home(props) {
    return (
        <div className="home-bg">
            <div className="home-content">
                <Row style={{}} gutter={18}>
                    <Col span={18} style={{ padding: "20px" }}>
                        <Button type="primary" onClick={() => { openWindowModeless(); }}>openWindowModeless</Button>
                        <br />
                        <br />
                        <Space size={10}>
                            <Button type="primary" onClick={() => { intoAdmin(); }}>进入后台</Button>
                            <Button type="primary" onClick={() => { quitHandler(); }}>退出系统</Button>
                        </Space>
                        <br />
                        <br />
                        <Space size={10}>
                            <span>当前数值：{props.number}</span>
                            <Button type="primary" onClick={() => props.add(4)}>加1</Button>
                            <Button type="primary" onClick={props.less}>减1</Button>
                        </Space>
                    </Col>
                    <Col span={6} style={{ padding: "20px" }}>
                        新增公告
                    </Col>
                </Row>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    number: state.number
});

const mapDispatchToProps = (dispatch) => ({
    add: bindActionCreators(AdminAction.add, dispatch),
    less: bindActionCreators(AdminAction.less, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
