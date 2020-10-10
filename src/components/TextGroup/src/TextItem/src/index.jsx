import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { isBoolean, isEmpty, isNumber } from 'lodash';
import '../../index.less';

function valueTransform({ title, content, format }) {
    // 如果带有format，认为content内容是需要经过moment转换的时间
    if (isNumber(content)) {
        return content;
    }

    if (!content) {
        return '--';
    }

    if (format) {
        return moment(content).format(format);
    }

    if (isEmpty(content)) {
        return '--';
    }
    if (isBoolean(content)) {
        return content ? '是' : '否';
    }
    return (
        <Tooltip title={content}
            placement="topLeft"
        >
            <div style={{ display: 'flex', width: '100%' }}>
                <div className={'ellipsis'}>
                    {content}
                </div>
            </div>
        </Tooltip>
    );
}

const TextItem = ({
    data, connect = '：', fontSize = 13, vspace 
}) => {
    return (
        <div className={'text_item'}
            style={{ fontSize, marginTop: vspace }}
        >
            <span className={'title'}>{data.title}</span>
            <span className={'connect'}>{connect}</span>
            {React.isValidElement(data.content) ? data.content : valueTransform(data)}
            {data.addonAfter ? (
                <span className={'addonAfter'}>{data.addonAfter}</span>
            ) : null}
        </div>
    );
};

TextItem.propTypes = {
    data: PropTypes.object.isRequired,
    connect: PropTypes.string,
    fontSize: PropTypes.number,
    vspace: PropTypes.number
};

export default TextItem;
