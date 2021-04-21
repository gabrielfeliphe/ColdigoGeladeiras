COLDIGO.marcas = new Object();

$(document).ready(function(){
	
	
	
	COLDIGO.marcas.cadastrarMarcas = function(){

		var marca = new Object();
		
		marca.nome = document.frmAddMarca.novaMarca.value;

		
		if (marca.nome==""){
			COLDIGO.exibirAviso("Preencha todos os campos!");
		}else{
			
			$.ajax({
				type: "POST",
				url: COLDIGO.PATH + "marca/inserir",
				data: JSON.stringify(marca),
				success: function(msg){
					COLDIGO.exibirAviso(msg);
					$("addMarca").trigger("reset");
					COLDIGO.marcas.buscarMarcas();

				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: "+info.status+" - "+info.statusText);
					
				}
			});
		}
	};
	
	COLDIGO.marcas.buscarMarcas = function(){ // PRIMEIRO PARTO FEITO, ESTOU RECEBENDO AS MARCAS DA BACKEND
	
		var valorBusca = $("#campoBuscaMarca").val();
		
		$.ajax({
			
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarMarcas",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				
				dados = JSON.parse(dados);
				
				$("#listaMarcas").html(COLDIGO.marcas.exibirMarcas(dados));
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText);
			},
				
		});	
	};
	
	COLDIGO.marcas.buscarMarcas(); // Fazer a instancia para a página sempre carregar a marca
	
	COLDIGO.marcas.exibirMarcas = function(listaDeMarcas){
		
		var tabela = "<table>"+
		"<tr>"+
		"<th>Marca</th>"+
		"<th class='acoes'>Ações</th>"+
		"</tr>";
		
		if(listaDeMarcas != undefined && listaDeMarcas.length > 0){
			
			for(var i=0; i<listaDeMarcas.length; i++){
				tabela += "<tr>"+
					"<td>"+listaDeMarcas[i].marcaNome+"</td>" +
					"<td>" +
						"<a onclick=\"COLDIGO.marcas.exibirEdicao('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>"+
						"<a onclick=\"COLDIGO.marcas.excluir('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>"+
					"</td>" +
					"</tr>"
			}
			
			
		}else if(listaDeMarcas ==""){
			tabela +="<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		tabela += "</table>";
		
		return tabela;
		
	};
	
});