COLDIGO.relatorioCompra = new Object();

$(document).ready(function(){
	
	COLDIGO.relatorioCompra.buscar = function(){
		$.ajax({
			type:"GET",
			url: COLDIGO.PATH+"compra/relatorio",
			success: function (dados){
				dados = JSON.parse(dados);
				$("#listaCompras").html(COLDIGO.relatorioCompra.exibir(dados));
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar as compras: "+ info.status +" - "+info.statusText)
			}
		});
	}
	
	COLDIGO.relatorioCompra.buscar();
	
	COLDIGO.relatorioCompra.exibir = function (listaDeCompras){
		
		var vendas = "";
		
		if(listaDeCompras != undefined && listaDeCompras.length > 0){
			for(var i=0; i<listaDeCompras.length; i++){
				vendas += "<table>"+
				"<tr>"+
					"<th colspan='5'>Id:"+listaDeCompras[i].id+"</th>"+
				"</tr>"+
				"<tr>"+
					"<th>Data</th>"+
					"<td>"+COLDIGO.formatarData(listaDeCompras[i].data)+"</td>"+
					"<th>Fornecedor</th>"+
					"<td colspan='2'>"+listaDeCompras[i].fornecedor+"</td>"+
				"</tr>";
				
				vendas += "<tr>"+
					"<th>Categoria</th>"+
					"<th>Marca</th>"+
					"<th>Modelo</th>"+
					"<th>Quantidade</th>"+
					"<th>Valor</th>"+
					"</tr>"
					
					listaDeCompras[i].produtos = JSON.parse(listaDeCompras[i].produtos);
				
				for(var j=0; j<listaDeCompras[i].produtos.length;j++){
					
					vendas +="<tr>"+
					"<td>"+listaDeCompras[i].produtos[j].categoria +"</td>"+
					"<td>"+listaDeCompras[i].produtos[j].marca +"</td>"+
					"<td>"+listaDeCompras[i].produtos[j].modelo +"</td>"+
					"<td>"+listaDeCompras[i].produtos[j].quantidade +"</td>"+
					"<td>R$ "+COLDIGO.formatarDinheiro(listaDeCompras[i].produtos[j].valor)+"</td>"+
					"</tr>"
				}
				
				
				vendas += "</table";
			}
		}else if(listaDeCompras ==""){
			vendas +="<h3>Nenhuma venda encontrada!</h3>";
		}
		return vendas;
	}
	
});