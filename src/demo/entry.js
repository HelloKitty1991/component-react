
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router } from 'react-router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import 'antd/dist/antd.min.css';
import { Example } from './Example';

const routes = {
    path: '/',
    component: Example
};

const render = Component => {
    ReactDOM.render(
        <LocaleProvider locale={zhCN}>
            <AppContainer>
                <Component
                    history={ hashHistory }
                    routes={ routes }
                />
            </AppContainer>
        </LocaleProvider>,
        document.getElementById('react-content')
    );
};

render(Router);

if (module.hot) {
    module.hot.accept(() => {
        render(Router);
    });
}
