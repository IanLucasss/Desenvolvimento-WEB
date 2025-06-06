$(document).ready(function() {
    let produtos = []; // Variável para armazenar todos os produtos
    
    // Carrega os produtos iniciais
    function carregarProdutos() {
        $('#catalogo').addClass('loading');
        
        $.getJSON("data.json")
            .done(function(response) {
                produtos = response;
                exibirProdutos(produtos);
            })
            .fail(function(jqxhr, textStatus, error) {
                console.error("Erro ao carregar produtos:", textStatus, error);
                $('#catalogo').html('<div class="col-12 text-center text-danger">Erro ao carregar produtos. Tente recarregar a página.</div>');
            })
            .always(function() {
                $('#catalogo').removeClass('loading');
            });
    }
    
    // Função para exibir produtos
    function exibirProdutos(produtosParaExibir) {
        let catalogo = $('#catalogo');
        let html = '';
        
        if (produtosParaExibir.length === 0) {
            catalogo.html('');
            $('#mensagem-vazio').removeClass('d-none');
        } else {
            $('#mensagem-vazio').addClass('d-none');
            
            for (let produto of produtosParaExibir) {
                html += `
                <div class="col-12 col-sm-6 col-md-4 mb-4">
                    <div class="card h-100 shadow border-0">
                        <img src="${produto.image}" class="card-img-top p-5 d-block mx-auto" alt="${produto.title}" style="height: 70%; width: 70%; object-fit: contain">
                        <div class="card-body">
                            <h5 class="card-title">${produto.title}</h5>
                            <p class="card-text">$${produto.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>`;
            }
            
            catalogo.html(html);
        }
        
        $('#total-produtos').text(produtosParaExibir.length);
    }
    
    // Função de busca
    function realizarBusca() {
        const termoBusca = $('#input-busca').val().toLowerCase().trim();
        $('#termo-busca').text(termoBusca);
        
        if (termoBusca === '') {
            exibirProdutos(produtos);
            $('#btn-limpar').hide();
        } else {
            const produtosFiltrados = produtos.filter(produto => 
                produto.title.toLowerCase().includes(termoBusca)
            );
            exibirProdutos(produtosFiltrados);
            $('#btn-limpar').show();
        }
    }
    
    // Evento de submit do formulário
    $('#form-busca').on('submit', function(e) {
        e.preventDefault();
        realizarBusca();
    });
    
    // Evento do botão limpar
    $('#btn-limpar').on('click', function() {
        $('#input-busca').val('');
        realizarBusca();
        $(this).hide();
    });
    
    // Mostra/oculta o botão limpar conforme digitação
    $('#input-busca').on('input', function() {
        $('#btn-limpar').toggle($(this).val().trim() !== '');
    });
    
    // Carrega os produtos quando a página estiver pronta
    carregarProdutos();
});