/*
    0 - Obter usuario
    1 - Preciso obter o numero de telefone de um usuario a partir de seu id
    2 - Obter endereço do usuario peo id
*/

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null,{
            id:1,
            nome:'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
   setTimeout(() => {
        return callback(null, {
            telefone: "997321017",
            ddd: "12"
        })
    }, 1000)
   }


function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'rua dos bobos',
            numero: 0
        })
    }, 1000)
}

function resolverUsuario(erro, usuario){
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario){
    //null "" 0 = false
    if(error){
        console.log("Deu ruim em usuario", error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
        if(erro1){
            console.log("Deu ruim em telefone", erro1)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
            if(erro2){
                console.log("Deu ruim em Endereço", erro2)
                return;
            }
    
            console.log(`
                Nome: ${usuario.nome}
                Endereço: ${endereco.rua}, ${endereco.numero}    
                Telefone: ${telefone.ddd}, ${telefone.telefone}    
            `)
    })
   

    })

})
// const telefone = obterTelefone(usuario.id)


// console.log('telefone',telefone)