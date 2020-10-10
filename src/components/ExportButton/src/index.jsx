/**
 * 导出按钮组件
 * @state{
 *  url: this.props.url,    待导出的地址
 *  title: this.props.title,    导出按钮的title
 *  loading: false,   按钮是否显示导出装填
 *  idName:'export_btn' 按钮id标识符(可选)
 * }
 */
import { Button } from 'antd';
import moment from 'moment';
import React from 'react';
import BaseComponent from '../../BaseComponent';

class ExportButton extends BaseComponent {
    state = {
        url: this.props.url,
        title: this.props.title,
        loading: false
    };

    componentWillReceiveProps = nextProps => {
        if (this.props.url !== nextProps.url) {
            this.setState({
                url: nextProps.url
            });
        }
    };

    componentDidMount() {
        
    }

    export = () => {
        this.setState({
            loading: true
        });
        let result = true;
        if (this.props.beforeExport) {
            result = this.props.beforeExport(this);
        }
        if (!result) {
            this.setState({
                loading: false
            });
            return;
        }
        if (!this.state.url) {
            this.showErrorMsg('缺少导出链接');
            this.setState({
                loading: false
            });
            return;
        }
        window.request(this.state.url, {
            responseType: 'blob'
        }).then(data => {
            if (!data) return;
            const filename = `${this.props.filename || moment().format('YYYY-MM-DD')}.${this.props.extension || 'xlsx'}`;
            const blob = new Blob([data], {
                type: 'application/octet-stream'
            });
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                window.navigator.msSaveBlob(blob, `${filename}`);
            } else {
                const blobURL = window.URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.style.display = 'none';
                tempLink.href = blobURL;
                tempLink.setAttribute('download', `${filename}`);

                if (typeof tempLink.download === 'undefined') {
                    tempLink.setAttribute('target', '_blank');
                }

                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobURL);
                this.setState({
                    loading: false
                });
            }
        })
            .catch(err => {
                const reader = new FileReader();
                reader.readAsText(err.data);
                reader.addEventListener('loadend', () => {
                    let data;
                    try {
                        data = JSON.parse(reader.result) || {};
                    } catch (e) {
                        data = {};
                    }
                    this.showErrorMsg(data.detail || data.msg || '服务器错误');
                    this.setState({
                        loading: false
                    });
                });
            });
    };

    render() {
        return (
            <div>
                <Button
                    onClick={ this.export }
                    loading={ this.state.loading }
                    className="btn-export"
                    style={this.props.style || {}}
                    icon="download"
                >
                    { this.state.title }
                </Button>
            </div>
        );
    }
}

export default ExportButton;
