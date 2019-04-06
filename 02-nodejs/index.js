/*
    0 - Obter usuario
    1 - Preciso obter o numero de telefone de um usuario a partir de seu id
    2 - Obter endereço do usuario peo id
*/
//IMportamos um modulo interno no node.js

const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    //Quando der algum problema --> reject
    //Quando sucess -> resolve
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            // return reject(new Error('Deu ruim de verdade!'))
         
            return resolve({
                id:1,
                nome:'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
    
}

function obterTelefone(idUsuario){
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() => {
             return resolve( {
                 telefone: "997321017",
                 ddd: "12"
             })
         }, 1000)
    })
   }


function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'rua dos bobos',
            numero: 0
        })
    }, 1000)
}

const usuarioPromise = obterUsuario()
//para manipular com sucesso usamos a função .then
//para manipular erros usamos a função .catch
usuarioPromise
    .then(function (usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario:{
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return{
                usuario: resultado.usuario,
                telefone:resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error){
        console.error('Deu ruim', error)
    })
// obterUsuario(function resolverUsuario(error, usuario){
//     //null "" 0 = false
//     if(error){
//         console.log("Deu ruim em usuario", error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
//         if(erro1){
//             console.log("Deu ruim em telefone", erro1)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
//             if(erro2){
//                 console.log("Deu ruim em Endereço", erro2)
//                 return;
//             }
    
//             console.log(`
//                 Nome: ${usuario.nome}
//                 Endereço: ${endereco.rua}, ${endereco.numero}    
//                 Telefone: ${telefone.ddd}, ${telefone.telefone}    
//             `)
//     })
   

//     })

// })
// const telefone = obterTelefone(usuario.id)


// console.log('telefone',telefone)