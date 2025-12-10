import { saveObject, getObject, saveStorage } from "./storage.js";

// adiciona um novo usuário
export function addUser(username, password) {
    let users = getObject("users") || []; //Se não houver nenhum usuário ele cria uma lista vazia

    //após a lista criada, ele adiciona um novo usuario porém ele sempre pega todos os outros salvos e adiciona 
    username = username.toLowerCase(); //para ignorar se estiver em capslock
    const newUser = {
        username,
        password
    };

    users.push(newUser); //coloco na lista usuário o usuário e senha na lista 

    saveObject("users", users);//salvo os users na lista users

    return newUser;
}


export function existUser(username) {
    let users = getObject("users") || []; //Se não houver nenhum usuário ele cria uma lista vazia

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) //aqui significa que achou um usuário com o mesmo nome
            return true;
    }

    return false; //acabou o else e não encontrou nenhum usuário igual, retorna falso
}

export function checkUser(username, password) {
    let users = getObject("users")

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            saveStorage("saveUser", username); //aqui ja salvo o usuário para depois pegar qual usuário está jogando e sua pontuação
            return true;
        }

    }
    return false;
}

export function scoreFinal(username, score, nivel) {
    let users = getObject("users");

    for (let i = 0; i < users.length; i++)
    {
        if (users[i].username == username) 
        {
            if (nivel == 300) 
            {
                if (users[i].scoreFacil == undefined || users[i].scoreFacil < score) 
                {
                    users[i].scoreFacil = score; //coloquei o usuario aqui;
                    saveObject("users", users);
                    break;
                }
            }
            else if(nivel == 200)
            {
                if (users[i].scoreMedio == undefined || users[i].scoreMedio < score) 
                {
                    users[i].scoreMedio = score; //coloquei o usuario aqui com o score do nível;
                    saveObject("users", users);
                    break;
                }
            }

              else if(nivel == 100)
            {
                if (users[i].scoreDificil == undefined || users[i].scoreDificil < score) 
                {
                    users[i].scoreDificil = score; //coloquei o usuario aqui com o score do nível;
                    saveObject("users", users);
                    break;
                }
            }


        }

    }



}
