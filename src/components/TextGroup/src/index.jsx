/**
 * @desc 内容显示组件，内置空值判断，空值一律返回'--'
 *
 *
 * @param { Number } column|4 一行展示的列数
 * @param { gutter } gutter|10 列与列之间横向的间隙
 * @param { Number } vspace|10 行与行之间的纵向间隙
 * @param { String } connect|: title与内容之间的连接符号
 * @param { Array } data 渲染的数据源
 * @param { String } data[].title 标题
 * @param { String | ReactNode } data[].content 标题
 * @param { String } data[].format 时间戳，如果存在此参数将默认进行moment转换
 * @param { String | ReactNode} data[].addonAfter 设置后置标签
 */


import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider } from 'antd';
import TextItem from './TextItem/index';

const TextGroup = ({
    column = 4,
    gutter = 20,
    data = [],
    vspace = 10,
    connect,
    fontSize,
    style = {}
}) => {
    const span = 24 / column;
    const longTextArr = data.filter(v => v && v.long_text) || [];
    const cols = [];
    data.forEach((inner, irIdx) => {
        if (!inner) return;
        if (inner.long_text) return;
        cols.push(
            <Col
                key={Math.random()}
                span={span}
            >
                <TextItem
                    key={`${irIdx}`}
                    connect={ connect }
                    data={ inner }
                    fontSize={ fontSize }
                    vspace={vspace}
                />
            </Col>
        );
    });
    longTextArr.forEach((v, j) => {
        cols.push(
            <Col
                key={Math.random()}
                span={24}
            >
                {
                    v.longTextBorder === true ? <Divider style={{ margin: '10px 0 0 0' }} /> : null
                }
                <TextItem
                    key={j}
                    connect={ connect }
                    data={ v }
                    fontSize={ fontSize }
                    vspace={vspace}
                    longText
                />
            </Col>
        );
    });
    return (
        <div className={'text_group'}>
            <Row
                gutter={gutter}
                style={style}
            >
                {
                    cols
                }
            </Row>
        </div>
    );
};

TextGroup.propTypes = {
    column: PropTypes.number,
    vspace: PropTypes.number,
    width: PropTypes.number,
    gutter: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]),
    data: PropTypes.array.isRequired,
    connect: PropTypes.string,
    fontSize: PropTypes.number,
    style: PropTypes.object
};

export default TextGroup;
