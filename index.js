let publicacao
let publicacoes = []
let comentario
let comentarios = []
let tblComentario
let tblPublicacoes
let curtirPublicacaoVar = []
let curtida = []
 

function publicar(){
    publicacao = document.getElementById('publicacao').value.trim() /*A função trim() em JavaScript remove espaços
 em branco no início e no final de uma string, garantindo que o texto inserido no campo de publicação seja limpo
e válido, evitando espaços desnecessários e publicações vazias. */

    if(publicacao){
        publicacoes.unshift(publicacao) /*A função .unshift adiciona o valor a primeira posição do array!
Assim cada publicação será salva no topo do array! */    
        comentarios.unshift([])/* Inicializa o array de comentarios na publicação seguindo a mesma dinamica de salvar o ultimo no topo do array!*/         
        exibir() 
        document.getElementById('publicacao').value = '' // Limpa o campo de entrada após publicar
    }else{
        alert('Digite algo para públicar!')
    }  
}

function exibir() {
    tblPublicacoes = '<table style="border-radius: 10px;" id="tblpublicacao" class="table table-dark table-hover">';
    for (let i = 0; i < publicacoes.length; i++) {
        tblPublicacoes += '<tr>' + '<td>' + 
            '<spam><img src="img/perfil.jpg" class="imgPerfilPublicacao"> Vinicius Castro: <button class="btn btn-light" id="curtirPublicacaoid" onclick="curtirPublicacao(' + i + ')"><i class="bi bi-hand-thumbs-up-fill"></i></button>' + 
            '<spam class="apresentaCurtida" id="apresentaCurtida' + i +'">' + (curtida[i] || 0) + '</spam>' + 
            '<div id="textPubli">' + publicacoes[i] + '</div></spam>' + 
            '<br><input class="coment" type="text" id="comentario' + i + '">' + 
            '<button class="btn btn-light btnNegrito" onclick="comentar(' + i + ')">Comentar</button>' + 
            '<button class="btn btn-light btnNegrito" onclick="excluirPublicacao(' + i + ')">Excluir</button>' + 
            '<div class="exibeComentario" id="exibeComentario' + i + '">' + exibirComentario(i) + '</div>' + 
            '</td>' + '</tr>';
    }
    tblPublicacoes += '</table>';
    document.getElementById('publicacoes').innerHTML = tblPublicacoes; // Apresenta a tabela com as publicações na página
}


function curtirPublicacao(i) {
    // Inicializa as arrays se ainda não foram inicializadas
    if (typeof curtirPublicacaoVar[i] === 'undefined') {
        curtirPublicacaoVar[i] = 0;
    }
    if (typeof curtida[i] === 'undefined') {
        curtida[i] = 0;
    }

    // Incrementa o contador de cliques para curtir
    curtirPublicacaoVar[i]++;
    
    // Alterna o estado de curtida
    if (curtirPublicacaoVar[i] % 2 != 0) { // Primeiro clique curte
        curtida[i] = 1;
    } else { // Segundo clique tira a curtida
        curtida[i] = 0;
    }

    // Atualiza a exibição de curtidas
    document.getElementById('apresentaCurtida' + i).innerHTML = curtida[i];
}

function comentar(index){
    comentario = document.getElementById('comentario' + index).value.trim() 
   
       if(comentario){//se o comentario tiver um valor preenchido.
           comentarios[index].unshift(comentario) /*A função .unshift adiciona o valor a primeira posição do array
           adicionando cada novo comentário no topo do array */
           document.getElementById('comentario' + index).value = '' // Limpa o campo de entrada após publicar
           exibir() //chama a função para exibição na tela
       }else{
        alert('Digite algo para comentar!')//Caso não tenha um valor, mostra mensagem de alerta.
       }
}

function exibirComentario(index) { 
    // Cria uma string que irá conter o HTML da tabela de comentários
    let tblComentario = '<table class="tblComentario">';
    
    // Itera sobre cada comentário na publicação de índice 'index'
    for (let j = 0; j < comentarios[index].length; j++) {
        // Adiciona uma linha na tabela para cada comentário, incluindo uma imagem e o texto do comentário
        tblComentario += '<tr class="linhaComentario"><td class="linhaComentario">'
                        + '<img src="img/mulher.png" class="imgPerfilPublicacao">'
                        + comentarios[index][j]
                        // Adiciona um botão de exclusão para cada comentário, chamando a função 'excluirComentario' com o índice da publicação e do comentário
                        + '<button id="excluiComentario" class="btn btn-dark btnNegrito" onclick="excluirComentario(' + index + ', ' + j + ')">Excluir</button>'
                        + '</td></tr>';
    }
    
    // Fecha a tag da tabela
    tblComentario += '</table>';
    
    // Retorna a string contendo o HTML da tabela de comentários
    return tblComentario;
}

function excluirPublicacao(i) {
    // Remove a publicação de índice 'i' do array 'publicacoes'
    publicacoes.splice(i, 1); // Remove a publicação na sua posição especifica no array
    comentarios.splice(i, 1); /* Remove os comentários associados à publicação excluída, em sua posição específica no array, porque, 
se os comentarios nao forem excluidos juntos com a publicação eles serão inseridos na publicação anterior e assim por sequencia*/
    
    // Atualiza a exibição para refletir a remoção da publicação
    exibir();
}

function excluirComentario(publicacaoIndex, comentarioIndex) {
    // Remove o comentário de índice 'comentarioIndex' do array de comentários associado à publicação de índice 'publicacaoIndex'
    comentarios[publicacaoIndex].splice(comentarioIndex, 1);
    
    // Atualiza a exibição para refletir a remoção do comentário
    exibir();
}

