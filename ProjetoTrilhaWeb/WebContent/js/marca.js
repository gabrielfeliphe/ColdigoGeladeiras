COLDIGO.marcas = new Object();

$(document).ready(function(){
	
	COLDIGO.marcas.buscarMarcas = function(){ // PRIMEIRO PARTO FEITO, ESTOU RECEBENDO AS MARCAS DA BACKEND
	
		var valorBusca = $("#campoBuscaMarca").val();
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				console.log(dados);
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText);
			},
				
		});	
	};
	
});