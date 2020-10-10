import React from 'react';
import PropTypes from 'prop-types';

export default class RecordInformationFooter extends React.PureComponent {
    static propTypes = {
        style: PropTypes.object,
        description: PropTypes.string,
        messages: PropTypes.array,
        onClickMessage: PropTypes.func
    };
    
    static defaultProps = {
        style: {},
        description: `Copyright © 1999-${new Date().getFullYear()} 成都路行通信息技术有限公司版权所有`,
        messages: [
            {
                title: '蜀ICP备08110633号-2',
                url: 'http://beian.miit.gov.cn/'
            },
            {
                title: '增值电信业务经营许可证：川B2-20130092',
                url: 'http://beian.miit.gov.cn/'
            }
        ],
        onClickMessage: (message) => {
            window.open(message.url);
        }
    };
    
    render() {
        return (
            <div 
                className="record-information-footer"
                style={{
                    ...this.props.style
                }}
            >   
                <span>{this.props.description}</span>
                {this.props.messages.map(item => (
                    <span
                        className="record-information"
                        key={`${item.title}_${item.url}`}
                        onClick={() => this.props.onClickMessage(item)}
                    >
                        {item.title}
                    </span>
                ))}
            </div>
        );
    }
}
