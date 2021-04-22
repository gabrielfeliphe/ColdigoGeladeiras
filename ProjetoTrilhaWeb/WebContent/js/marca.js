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
					COLDIGO.exibirAviso("Erro ao cadastrar um nova marca: "+info.status+" - "+info.statusText);
					
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
	
	
	COLDIGO.marcas.excluir = function(id){
		
		var modal = {
				title: "Mensagem",
				height: 250,
				width: 400,
				modal: true,
				buttons: {
					"OK": function(){
						$(this).dialog("close");
						$.ajax({
							type: "DELETE",
							url: COLDIGO.PATH + "marca/excluir/"+id,
							success: function (msg){
								COLDIGO.exibirAviso(msg);
								COLDIGO.marcas.buscarMarcas();
							},
							error: function(info){
								COLDIGO.exibirAviso("Erro ao excluir marca: "+ info.status + " - " + info.statusText);
							},
						});
					},
					"Cancelar" : function(){
						$(this).dialog("close");
					}
				}
			};
			$("#modalAviso").html("Deseja realmente deletar esse marca ?");
			$("#modalAviso").dialog(modal);
		
	};
	
	COLDIGO.marcas.exibirEdicao = function(id){
		
		console.log("exibir edicao id: "+id);
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorId",
			data: "id="+id,
			success: function(marca){
				
				console.log(marca);
				
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.marcaId.value = marca.nome;
				
				
				var selMarcaEdicao = document.getElementById ('selMarcaEdicao');		
				
				var modalEditaMarca = {
						title: "Editar Marca",
						height: 200,
						width: 350,
						modal: true,
						buttons:{
							"Salvar": function(){
								COLDIGO.marcas.editarMarca();
								$(this).dialog("close"); // ADICIONAR ESSA LINHA PARA RETIRAR OS ERRORS DE CLOSE
							},
							"Cancelar": function(){
								$(this).dialog("close");
							}
						},
						close: function(){
							//caso o usuário simplesmente feche a caixa de edição
							// nao deve acontecar nada
						}
				};
				
				$("#modalEditaMarca").dialog(modalEditaMarca);
				
			},
			error: function(info){
				
				COLDIGO.exibirAviso("Erro ao buscar a marca para edição: "+info.status+" - "+info.statusText);
			}
		});
		
	};
	
	
	COLDIGO.marcas.editarMarca = function (id){
			
		var marca = new Object();
		
		marca.id = document.frmEditaMarca.idMarca.value; // TEM QUE SER O MESMO NOME DE ATRIBUTO DA CLASSE;
		marca.nome= document.frmEditaMarca.marcaId.value;
		
		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/alterar",
			data: JSON.stringify(marca),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marcas.buscarMarcas();
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar marca: "+info.status+" - "+info.statusText);
			}
		});
		
	};
});