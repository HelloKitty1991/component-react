const request = require('@hello/utils/lib/request').default;

const req = request({
    baseURL: 'http://zeus.ot.hello.com',
    interceptors: {
        request: requestObj => {
            if (window.ticket) {
                if (!requestObj.params) requestObj.params = {};
                requestObj.params.ticket = window.ticket;
            }
            return requestObj;
        },
        response: obj => {
            // console.log(obj.data);
            return obj;
        },
        responseError: err => {
            return err.response;
        }
    }
});

function gethelloAgent() {
    const { userAgent } = navigator;
    const version = userAgent.match(/jsdom\/([\d.]+)/)[1];
    const platform = 'jsdom';
    const zeusVersion = 'hello-component-unit-test';
    const { width } = window.screen;
    const { height } = window.screen;
    return `BROWSER|${platform}|${version}|ZEUS|${zeusVersion}|${userAgent}|${width}*${height}|${window.fingerPrint}`;
}

function exportRequest(url, opt = {}) {
    opt.headers = { 'hello-Agent': gethelloAgent(), ...opt.headers || {} };
    return req(url, opt);
}

window.request = exportRequest;

export default exportRequest;
