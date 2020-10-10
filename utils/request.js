const request = require('@hello/utils/lib/request').default;

const req = request({
    baseURL: 'http://zeus.v200113.dev.hello.com'
});

function gethelloAgent() {
    const { userAgent } = navigator;
    const version = userAgent.match(/Chrome\/([\d.]+)/)[1];
    const platform = 'Chrome';
    const zeusVersion = 'V4.13.6';
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
