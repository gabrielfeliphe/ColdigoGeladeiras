COLDIGO.compra = new Object();

$(document).ready(function(){
	
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
	});
	
	COLDIGO.compra.removeCampo = function(botao){
		if($("tr.detalhes").length > 1){
			//remove a linha que contem o botao
			//parent pega o elemento e vê quem é o pai
			// uma escadinha inversa nos elementos do DOM
			$(botao).parent().parent().remove();
		}else{
			COLDIGO.exibirAviso("A última linha não pode ser removida");
		}
	}
	
});