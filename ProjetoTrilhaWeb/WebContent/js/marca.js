COLDIGO.marcas = new Object();

$(document).ready(function(){
	
	COLDIGO.marcas.buscarMarcas = function(){ // PRIMEIRO PARTO FEITO, ESTOU RECEBENDO AS MARCAS DA BACKEND
	
		var valorBusca = $("#campoBuscaMarca").val();
		
		$.ajax({
			
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarMarcas",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				
				console.log(dados);
				
				dados = JSON.parse(dados);
				
				console.log("tratado :"+dados);
				
				$("#listaMarcas").html(COLDIGO.marcas.exibirMarcas(dados));
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText);
			},
				
		});	
	};
	
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