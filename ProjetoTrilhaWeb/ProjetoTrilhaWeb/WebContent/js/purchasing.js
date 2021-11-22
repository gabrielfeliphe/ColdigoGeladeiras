COLDIGO.compra = new Object();

$(document).ready(function(){
	
	COLDIGO.compra.carregarMarcas = function(id){
		
		var camposMarcas = document.getElementsByName('selMarca[]');
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			
			success: function(marcas){
				
				$(camposMarcas[id]).html("");
				
				if(marcas.length){
					var option= document.createElement("option");
					option.setAttribute("value","");
					option.innerHTML =("ESCOLHA");
					
					$(camposMarcas[id]).append(option);
					
					for(var i=0; i<marcas.length; i++){
						var option = document.createElement("option");
						option.setAttribute ("value",marcas[i].id);
						option.innerHTML = (marcas[i].nome);
						
						$(camposMarcas[id]).append(option);
					}
					
				}else{
								
					var option = document.createElement("option");
					option.setAttribute("value","");
					option.innerHTML = ("Cadastre uma marca primeiro !");
					
					$(camposMarcas[id]).addClass("aviso");
					
					$(camposMarcas[id]).append(option);
				}
			},
			
			//fim do sucess
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