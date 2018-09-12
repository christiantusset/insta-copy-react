export function notificacao(state = [], action) {
    if (action.type === 'NOTIFICA') {
        return action.msg;
    }
    else {
        return state;
    }
}