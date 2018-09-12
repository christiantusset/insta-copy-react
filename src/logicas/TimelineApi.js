import { listagem, like, comentario, notifica } from '../actions/actionCreator';

export default class TimelineApi {

    static lista(urlPerfil) {
        return (dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(listagem(fotos));
                    return fotos;
                });
        });
    }

    static like(fotoId) {
        return dispatch => {
            let token = localStorage.getItem('auth-token');
            fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${token}`, { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        throw new Error('Não foi possível realizar o like na foto!');
                    }
                })
                .then(liker => {
                    dispatch(like(fotoId, liker));
                    return liker;
                });
        }
    }

    static comenta(fotoId, textoComentario) {
        return dispatch => {
            let token = localStorage.getItem('auth-token');
            let requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: textoComentario }),
                headers: new Headers({
                    'Content-type': 'application/json',
                })
            };

            fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`, requestInfo)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        throw new Error('Não foi possível realizar o comentário na foto!');
                    }
                })
                .then(novoComentario => {
                    dispatch(comentario(fotoId, novoComentario));
                    return novoComentario;
                });
        }
    }

    static pesquisa(loginPesquisado) {
        return dispatch => {
            fetch(`http://localhost:8080/api/public/fotos/${loginPesquisado}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(fotos => {
                    if (fotos === undefined) {
                        dispatch(notifica('Usuário não encontrado!'));
                    }
                    else if (fotos.length === 0) {
                        dispatch(notifica('Usuário não encontrado!'));
                    }
                    else {
                        dispatch(notifica(''));
                        dispatch(listagem(fotos));
                    }
                    return fotos;
                });
        }
    }

}