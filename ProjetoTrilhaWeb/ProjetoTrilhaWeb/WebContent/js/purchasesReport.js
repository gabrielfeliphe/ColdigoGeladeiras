COLDIGO.relatorioCompra = new Object();

$(document).ready(function(){
	
	COLDIGO.relatorioCompra.buscar = function(){
		$.ajax({
			type:"GET",
			url: COLDIGO.PATH+"compra/relatorio",
			success: function (dados){
				console.log(dados);
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar as compras: "+ info.status +" - "+info.statusText)
			}
		});
	}
	
	COLDIGO.relatorioCompra.buscar();
	
});