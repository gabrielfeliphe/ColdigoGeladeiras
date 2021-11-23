COLDIGO.compra = new Object();

$(document).ready(function(){
	
	categoriaAntigo = new Array();
	categoriaAntigo[0] = "";
	marcaAntigo = new Array();
	marcaAntigo[0] = "";
	
	
	COLDIGO.compra.guardaValores = function(){
		
		var categoriaAtual = document.getElementsByName('selCategoria[]');
		var marcaAtual = document.getElementsByName('selMarca[]');
		
		for(var i=0;i<categoriaAtual.length;i++){
			
			categoriaAntigo[i] = categoriaAtual[i].value;
			marcaAntigo[i] = marcaAtual[i].value;
		}
	}
	
	
	
	COLDIGO.compra.carregarMarcas = function(id){
		
		var camposMarcas = document.getElementsByName('selMarca[]');	
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			
			success: function(marcas){
				// esvazia o select do id recebido
				$(camposMarcas[id]).html("");
				// se tiver mais de uma marca nesse objt
				if(marcas.length){
					// opcao vazia, aquele topo de escolha
					var option= document.createElement("option");
					option.setAttribute("value","");
					option.innerHTML =("ESCOLHA");
					//coloca o campo no select correto
					$(camposMarcas[id]).append(option);
					// adiciona as marcas
					for(var i=0; i<marcas.length; i++){
						//criamos as opções com id e nome da marca
						var option = document.createElement("option");
						option.setAttribute ("value",marcas[i].id);
						option.innerHTML = (marcas[i].nome);
						// por fim ai insere no select
						$(camposMarcas[id]).append(option);
					}
					// se nao tiver marca no bd
				}else{
					// cria a opção do topo			
					var option = document.createElement("option");
					option.setAttribute("value","");
					option.innerHTML = ("Cadastre uma marca primeiro !");
					// pixa de vermelho a opção
					$(camposMarcas[id]).addClass("aviso");
					//insere no select
					$(camposMarcas[id]).append(option);
				}
			},
			
			error: function(info){
				
				console.log("entrou no exibir error")
				
				COLDIGO.exibirAviso("Erro ao buscar as marcas: "+info.status+" - "+info.statusText);
				$(camposMarcas[id]).html("");
				var option = document.createElement("option");
				option.setAttribute("value","");
				option.innerHTML = ("Erro ao carregar marcas!");
				$(camposMarcas[id]).addClass("aviso");
				$(camposMarcas[id]).append(option);
			}
		});
		
	}
	
	
	COLDIGO.compra.carregarMarcas(0);
	
	
	$(".botaoAdd").click(function(){
		
		// clona a primeira linha de detalhe
		var novoCampo = $("tr.detalhes:first").clone();
		//Esvazia o clone
		novoCampo.find("input").val("");
		//Insere o clone na pagina, apos a ultima linha existente
		novoCampo.insertAfter("tr.detalhes:last");
		
		COLDIGO.compra.guardaValores();
		
	});
	
	COLDIGO.compra.removeCampo = function(botao){
		if($("tr.detalhes").length > 1){
			//remove a linha que contem o botao
			//parent pega o elemento e vê quem é o pai
			// uma escadinha inversa nos elementos do DOM
			$(botao).parent().parent().remove();
			
			COLDIGO.compra.guardaValores();
			
		}else{
			COLDIGO.exibirAviso("A última linha não pode ser removida");
		}
	}
	
	
	COLDIGO.compra.carregarProdutos = function(){
		
		var selectProduto = document.getElementsByName('selProduto[]');
		var marcaAtual = document.getElementsByName('selMarca[]');
		var categoriaAtual = document.getElementsByName('selCategoria[]');
		
		for(var j=0;j<selectProduto.length;j++){
			
			if((marcaAntigo[j] != marcaAtual[j].value)||(categoriaAntigo[j] != categoriaAtual[j].value)){
				linhaAlterada = j;
			}
		}
		
		if((marcaAtual[linhaAlterada].value=="")||(categoriaAtual[linhaAlterada].value=="")){
			COLDIGO.compra.guardaValores();
			
			return false;
		}
		
		
		marcaCod = marcaAtual[linhaAlterada].value;
		categoriaCod = categoriaAtual[linhaAlterada].value;
		
		$(selectProduto[linhaAlterada]).html("<option>Aguarde</option>");
		
		
		$.ajax({
			type:"GET",
			url: COLDIGO.PATH+"produto/buscarParaVenda",
			data:"categoria="+categoriaCod+"&idMarca="+marcaCod,
			
			success: function(produtos){
				
				produtos = JSON.parse(produtos);
				
				$(selectProduto[linhaAlterada]).html("");
				
				
				if(produtos.length){
					
					$(selectProduto[linhaAlterada]).removeClass("aviso");
					
					var option = document.createElement("option");
					option.setAttribute = ("value","");
					option.innerHTML = ("Escolha");
					$(selectProduto[linhaAlterada]).append(option);
					
					for(var i=0;i<produtos.length;i++){
						var option = document.createElement("option");
						option.setAttribute("value",produtos[i].id);
						option.innerHTML = (produtos[i].modelo);
						$(selectProduto[linhaAlterada]).append(option);
					}
				}else{
					
					var option = document.createElement("option");
					option.setAttribute("value","");
					option.innerHTML = ("não há produtos correspondentes!");
					$(selectProduto[linhaAlterada]).append(option);
					
					$(selectProduto[linhaAlterada]).addClass("aviso");
				}
				
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar os produtos: "+info.status+" - "+info.statusText);
				
				$(selectProduto[linhaAlterada]).html("");
				var option = document.createElement("option");
				option.setAttribute ("value", "");
				option.innerHTML = ("Erro ao carregar produtos!");
				$(selectProduto[linhaAlterada]).append(option);
				$(selectProduto[linhaAlterada]).addClass("aviso");
			}
		});
		
		COLDIGO.compra.guardaValores();
	}
	
	
	COLDIGO.compra.validaDataFornecedor = function(){
		
		var validaData = document.frmAddCompra.txtData.value;
		var validaFornecedor = document.frmAddCompra.txtFornecedor.value;
		var retorno;
		
		
		if(validaData==""){
			COLDIGO.exibirAviso("A data não foi preenchida")
			retorno = false;
		}else if(validaFornecedor==""){
			COLDIGO.exibirAviso("O campo do fornecedor não foi preenchido")
			retorno = false;
		}else{
		retorno = true;
		}
		
		return retorno;
	}
	
	
	COLDIGO.compra.validaDetalhe = function(){
		var produtosValidar = document.getElementsByName('selProduto[]');
		
		var qtdeValidar = document.getElementsByName("txtQuantidade[]");
		var valorValidar = document.getElementsByName("txtValor[]");
		
		for(var i=0;i<produtosValidar.length;i++){
			var linha= i+1;
			
			if((produtosValidar[i].value=="")||(qtdeValidar[i].value=="")||(valorValidar[i].value=="")){
				COLDIGO.exibirAviso("A linha"+linha+" não foi completamente preenchida.");
				
				return false;
			}
		}
		return true;
	}
	
	COLDIGO.compra.cadastrar = function(){
		
		console.log(COLDIGO.compra.validaDataFornecedor())
		
		if((COLDIGO.compra.validaDetalhe()==true)&&(COLDIGO.compra.validaDataFornecedor()==true)){
			var compra = new Object();
			compra.data = document.frmAddCompra.txtData.value;
			compra.fornecedor = document.frmAddCompra.txtFornecedor.value;
			var produtos = document.getElementsByName('selProduto[]');
			var quantidades = document.getElementsByName('txtQuantidade[]');
			var valores = document.getElementsByName('txtValor[]');
			compra.produtos = new Array(produtos.length);
			for(var i=0;i<produtos.length;i++){
				compra.produtos[i]=new Object();
				compra.produtos[i].idProduto = produtos[i].value;
				compra.produtos[i].quantidade = quantidades[i].value;
				compra.produtos[i].valor = valores[i].value;
			}
			
			console.log(compra);
			
			$.ajax({
				type:"POST",
				url: COLDIGO.PATH+"compra/inserir",
				data:JSON.stringify(compra),
				success: function(msg){
					COLDIGO.exibirAviso(msg);
				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: "+info.status+" - "+info.statusText);
				}
			});
		}
	}
	
	
	
});