/**
 * Created by Administrator on 2017/2/14.
 */
import React from 'react';

import { message, Table } from 'antd';
import moment from 'moment';

export default class HistoryRecords extends React.PureComponent {
    constructor(props) {
        super(props);
        this.columns = props.columns || [
            {
                title: '操作时间',
                dataIndex: 'time',
                key: 'time',
                width: 130,
                render: (text, row) => <span>{ row.create_time ? moment(row.create_time).format('YYYY-MM-DD HH:mm:ss') : moment(row.time).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '操作人',
                key: 'operator',
                width: '15%',
                render: (text, row) => <span>{ row.operator ? row.operator.name : row.operator_name || '--' }</span>
            },
            {
                title: '操作角色',
                dataIndex: 'role__name',
                width: '20%',
                render: (v, r) => <span>{ r.operator ? r.operator.role__name : r.operator_role || '--' }</span>
            },
            // {
            //     title: '操作',
            //     dataIndex: 'operation',
            //     width: '20%'
            // },
            {
                title: '操作详情',
                key: 'detail',
                render: (v, r) => <span style={{ wordBreak: 'break-all' }}>{ r.remark || r.detail }</span>
            }
        ];
        this.state = {
            dataSource: []
        };
    }

    componentDidMount() {
        const { url } = this.props;
        this.setState({
            loading: true
        });
        window.request(url).then(data => {
            this.setState({
                dataSource: data,
                loading: false
            });
        }).catch(err => {
            this.setState({
                loading: false
            });
            message.error(err.message);
        });
    }

    render() {
        return (
            <Table
                loading={ this.state.loading }
                dataSource={ this.state.dataSource }
                columns={ this.columns }
                pagination={ false }
                rowKey={ record => record.id }
                scroll={{ y: this.props.scrollY || 500, x: false }}
                style={this.props.style || null}
            />
        );
    }
}
