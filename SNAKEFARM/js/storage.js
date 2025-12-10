
/**
 * Salva no storage
 * @param {*} key - chave
 * @param {*} value - valor que irá salvar
 */

//para usar as funções preciso exporta-las
//aqui é a função de salvar no Storage, passo como parametro a chave e o valor a ser salvo
export function saveStorage(key,value){
    localStorage.setItem(key, value); //setItem é o que salva
}

/**
 * Recupera/pega o item no storage
 * @param {*} key
 * @retuns
 */

//essa função recupera o item no storage
export function getStorage(key){
    return localStorage.getItem(key); //getItem recupera o que foi salvo
}

//função para salvar e pegar os usuários
export function saveObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getObject(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
