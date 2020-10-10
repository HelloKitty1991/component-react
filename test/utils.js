import './request';

export function doLogin() {
    return window.request('http://authserver.ot.hello.com/auth_service/admin/login_without_captcha/', {
        method: 'POST',
        params: {
            username: '15008263562',
            password: 'Pah123'
        }
    }).then(data => {
        window.ticket = data.ticket;
        return data;
    }).catch(e => {
        throw e;
    });
}
