import React from 'react';
import ReactDom from 'react-dom';
import {
    message, Modal, notification, Tabs, LocaleProvider 
} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { isFunction, isString } from 'lodash';
import LargerImgDisplay from '../../LargerImgDisplay/index';
import MessageContent from '../../MessageContent/index';
import HistoryRecords from '../../HistoryRecords/index';
import Button from '../../Button/index';
import './images/info.svg';
import './images/success.svg';
import './images/error.svg';
import './images/warning.svg';

const { TabPane } = Tabs;
let dialogIds = [];

const BtnGroup = props => {
    return (
        <div className={'module-footer'}
            style={{ marginTop: 20 }}
        >
            {props.children}
        </div>
    );
};

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tip: '',
            count: 0,
            current: 1,
            list: []
        };
    }

    showErrorMsg = msg => {
        if (process.env.NODE_ENV === 'development') {
            console.trace(msg);
        }
        this.showMessage('error', msg);
    };

    showSuccessMsg = msg => {
        this.showMessage('success', msg);
    };

    showWarningMsg = msg => {
        this.showMessage('warning', msg);
    };

    showMessage = (type, msg) => {
        type = type || 'info';
        message[type](msg);
    };

    showInfoAlert = (msg, title) => {
        this.showAlert('info', msg, title);
    };

    showSuccessAlert = (msg, title) => {
        this.showAlert('success', msg, title);
    };

    showErrorAlert = (msg, title) => {
        this.showAlert('error', msg, title);
    };

    showWarningAlert = (msg, title) => {
        this.showAlert('warning', msg, title);
    };

    showAlert = (type, msg, title) => {
        let _msg; let _title; let _okText; let 
            _okCallback;
        if (typeof msg === 'object') {
            _msg = msg.msg;
            _title = msg.title;
            _okText = msg.okText;
            _okCallback = msg.callback;
        } else if (typeof title === 'function') {
            _msg = msg;
            _okCallback = title;
            _okText = '知道了';
        } else {
            _msg = msg;
            _title = title;
            _okText = '知道了';
        }
        const btnGroup = (
            <BtnGroup>
                <Button
                    className={'btn-submit'}
                    onClick={() => {
                        _okCallback && _okCallback();
                        this.closeDialog();
                    }}
                >
                    {_okText}
                </Button>
            </BtnGroup>
        );
        this.showComponent(
            <MessageContent
                type={type}
                btnGroup={btnGroup}
                title={_title}
                msg={_msg}
            />,
            {
                style: {
                    minWidth: 350
                },
                width: 'auto',
                closable: false
            }
        );
    };

    showSuccessToast = options => {
        options.type = 'success';
        this.showToast(options);
    };

    showWarningToast = options => {
        options.type = 'warning';
        this.showToast(options);
    };

    showInfoToast = options => {
        options.type = 'info';
        this.showToast(options);
    };

    showErrorToast = options => {
        options.type = 'error';
        this.showToast(options);
    };

    showToast = (...params) => {
        const {
            type, msg, title, duration = 3000, countDown, callback 
        } = params[0] || {};
        this.showComponent(
            <MessageContent
                type={type}
                title={title}
                msg={msg}
                size={72}
                countDown={countDown}
                iconStyle={{ marginBottom: 0 }}
                contentStyle={{ marginBottom: 0 }}
                callback={() => {
                    this.closeDialog();
                    callback && callback();
                }}
            />,
            {
                style: {
                    minWidth: 300
                },
                width: 'auto',
                closable: false
            }
        );
        if (!countDown) {
            setTimeout(this.closeDialog, duration);
        }
    };

    showNotification = msg => {
        notification.open({
            message: '消息提醒',
            description: msg
        });
    };

    showModalConfirm = (content, title, onOk, onCancel) => {
        let defaultObj = {
            title: '',
            content: '',
            okText: '确定',
            okType: 'primary',
            onOk() {
            },
            cancelText: '取消',
            cancelType: 'info',
            onCancel() {
            }
        };
        if (typeof title === 'string') {
            defaultObj.title = title;
            defaultObj.onOk = onOk.onOk;
            defaultObj.okText = onOk.okText;
            defaultObj.cancelText = onCancel.cancelText;
            defaultObj.onCancel = onCancel.onCancel;
        } else if (typeof title === 'function') {
            defaultObj.title = '提醒';
            defaultObj.onOk = defaultObj.title;
            defaultObj.onCancel = defaultObj.onOk;
        } else if (typeof title === 'object') {
            defaultObj.title = '提醒';
            defaultObj = Object.assign(defaultObj, title || {});
        }

        this.showDialog(content, defaultObj);
    };

    showConfirm = (title, onOk, onCancel) => {
        let defaultObj = {
            title: '',
            content: '',
            okText: '确定',
            okType: 'primary',
            onOk() {
            },
            cancelText: '取消',
            cancelType: 'info',
            onCancel() {
            },
            style: {
                minWidth: 350
            },
            width: 'auto',
            closable: false,
            type: 'info'
        };
        onOk && (defaultObj.onOk = onOk);
        onCancel && (defaultObj.onCancel = onCancel);

        const btnGroup = (
            <BtnGroup>
                <Button
                    onClick={async () => {
                        defaultObj.onCancel && defaultObj.onCancel();
                        this.closeDialog();
                    }}
                    className={'btn-cancel'}
                >
                    {defaultObj.cancelText}
                </Button>
                <Button
                    className={'btn-submit'}
                    onClick={async () => {
                        defaultObj.onOk && defaultObj.onOk();
                        this.closeDialog();
                    }}
                    style={{ marginLeft: 20 }}
                >
                    {defaultObj.okText}
                </Button>
            </BtnGroup>
        );

        if (typeof title === 'object') {
            defaultObj = Object.assign(defaultObj, title);
        } else if (typeof title === 'string') {
            defaultObj.title = title;
        }

        defaultObj.content = (
            <MessageContent
                type={defaultObj.type || 'info'}
                btnGroup={btnGroup}
                title={defaultObj.title}
                msg={defaultObj.content}
            />
        );
        this.showComponent(defaultObj.content, {
            ...defaultObj, 
            title: '', 
            onOk: undefined, 
            onCancel: undefined 
        });
    };

    /**
     * Tabs弹窗组件调用法法，内部自动包含识别key为HISTORY时，自动补充历史记录tab
     * @param { object } tabsProps 包含所有antd.design Tabs Api
     * @param { array } tabPane  除antd.design Tabs.TabPane上的Api外，
     *                           包含新增：
     *                           array[].component 当前tab渲染的组件
     * @param options
     * @example this.showComponentWithTabs({}, [
     *     { key: 'DETAIL', tab: '详情', component: <DetailComponent /> },
     *     { key: 'HISTORY', tab: '自定义历史记录', component: <CustomHisoryComponent /> },
     *     { key: 'HISTORY', tab: '历史记录', url: '/order/123/history/' },
     * ])
     */
    showComponentWithTabs = (tabsProps, tabPane, options) => {
        tabPane = tabPane || [];
        tabsProps = tabsProps || {};
        options = options || {};
        const content = (
            <Tabs {...tabsProps}>
                {tabPane.map(val => {
                    let tabPaneProps = {
                        ...val,
                        component: null
                    };
                    let tabContent = val.component;
                    if (val.key === 'HISTORY') {
                        tabPaneProps = {
                            ...val,
                            component: null,
                            url: null
                        };
                        const maxHeight = document.body.clientHeight - 70 - 55;
                        tabContent = val.component || (
                            <HistoryRecords style={{ maxHeight: maxHeight - 50 - 40 }}
                                scrollY={maxHeight - 50 - 40 - 60}
                                url={val.url}
                            />
                        );
                    }
                    return (
                        <TabPane
                            key={val.key}
                            {...tabPaneProps}
                            style={{
                                ...(tabPaneProps.style || {}),
                                ...{
                                    maxHeight: document.body.clientHeight - 195,
                                    overflowX: 'hidden',
                                    overflowY: 'auto'
                                }
                            }}
                        >
                            {' '}
                            {tabContent}{' '}
                        </TabPane>
                    );
                })}
            </Tabs>
        );
        options = options || {};
        options.footer = null;
        this.showDialog(content, options);
    };

    showComponent(content, options) {
        options = options || {};
        if (!options.showFooter) {
            options.footer = null;
        }
        this.showDialog(content, options);
    }

    showDialog(ct, params) {
        if (!ct) return;
        let ctRef = null;
        let asyncCloseMethod = 'asyncClose';
        if (isString(params.async)) {
            asyncCloseMethod = params.async;
        }
        const maxHeight = document.body.clientHeight - 70 - 55;
        this.props = this.props || {};
        const extendsPropsObj = {
            location: this.props.location || {},
            router: this.props.router || {},
            maxHeight
        };
        if (this.props.store) {
            extendsPropsObj.store = this.props.store;
        }
        if (this.props.actions) {
            extendsPropsObj.actions = this.props.actions;
        }
        let content = isFunction(ct) ? ct(ref => { ctRef = ref; }) : ct;
        content = React.cloneElement(content, { ...content.props || {}, ...extendsPropsObj, ref: ref => { this.dialogContentComponent = ref; } });
        const div = document.createElement('div');
        const id = Math.random()
            .toString(32)
            .slice(2);
        dialogIds.push(id);
        div.id = id;
        document.body.appendChild(div);
        params = params || {};
        params.okText = params.okText || '确定';
        params.maskClosable = params.maskClosable || false;
        params.cancelText = params.cancelText || '取消';
        params.visible = true;
        params.closable = typeof params.closable === 'undefined' ? true : params.closable;
        params.title = params.title || '';
        params.bodyStyle = {
            maxHeight,
            overflow: 'auto',
            ...params.bodyStyle
        };
        params.style = {
            display: 'inline-table',
            paddingTop: 60,
            ...params.style || {}
        };
        const { onOk } = params;
        const { onCancel } = params;

        params.onOk = async () => {
            let result = true;
            if (onOk) {
                result = await onOk();
            } else if (this.dialogContentComponent && this.dialogContentComponent.handleSubmit) {
                result = await this.dialogContentComponent.handleSubmit();
            }
            if (result) {
                this.closeDialog();
            }
        };
        params.onCancel = async e => {
            if (params.async) {
                ctRef[asyncCloseMethod](() => {
                    this.closeDialog();
                    if (onCancel) {
                        onCancel();
                    }
                });
            } else {
                let result = true;
                if (params.beforeClose) {
                    result = await params.beforeClose(e);
                }
                if (result) {
                    if (onCancel) {
                        result = await onCancel();
                    } else if (this.dialogContentComponent && this.dialogContentComponent.onCancel) {
                        result = this.dialogContentComponent.onCancel();
                    }
                    if (result) {
                        this.closeDialog();
                    }
                }
            }
        };
        const modelContent = React.createElement(Modal, params, content);
        ReactDom.render(
            React.createElement(
                LocaleProvider,
                { locale: zhCN },
                modelContent
            ),
            div
        );
    }

    closeDialog() {
        const div = document.getElementById(dialogIds[dialogIds.length - 1]);
        if (div) {
            const unmountResult = ReactDom.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
            }
            dialogIds = dialogIds.slice(0, dialogIds.length - 1);
        }
    }

    showLoading = msg => {
        this.setState({
            loading: true,
            tip: msg || '数据加载中，请稍候......'
        });
    };

    hideLoading = () => {
        this.setState({
            loading: false
        });
    };

    showPhotoView(photo, photos, leftNode, independent) {
        if (!photo) {
            this.showErrorMsg('没有可查看的图片');
            return;
        }
        const div = document.createElement('div');
        div.id = 'zeus_photo_view';
        document.body.appendChild(div);
        if (typeof photo === 'string') {
            photo = {
                id: 1,
                photo
            };
        } else if (Array.isArray(photo)) {
            photos = photo.map((v, k) => {
                if (typeof v !== 'object' || !v.id) {
                    return {
                        id: k + 1,
                        photo: v
                    };
                }
                return v;
            });
            photo = photos[0];
        }
        if (!photos || !photos.length) {
            photos = [photo];
        }
        ReactDom.render(
            React.createElement(LargerImgDisplay, {
                photo,
                photos,
                leftNode,
                independent
            }),
            div
        );
    }
}
