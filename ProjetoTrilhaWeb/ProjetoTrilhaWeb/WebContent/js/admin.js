//Cria o objeto COLDIGO, que será usado como identificador do projeto
COLDIGO = new Object();


$(document).ready(function(){
	
	//Cria uma constante com o valor da URI rais do REST
	COLDIGO.PATH = "/ProjetoTrilhaWeb/rest/";
	
	$("header").load("/ProjetoTrilhaWeb/pages/admin/general/header.html")
	$("footer").load("/ProjetoTrilhaWeb/pages/admin/general/footer.html")
	
	//Função para carregamento de páginas de conteúdo que
	//recee como parâmetro o nome da pasta com a página a ser carregada
	COLDIGO.carregaPagina= function(pagename){
		//Remove o contúdo criado na abertura de uma janela pelo modal JQueryUI
		if($(".ui-dialog"))
			$(".ui-dialog").remove();
		//limpa a tag section, excluindo todo o conteúdo de dentro dela
		$("section").empty();
		//carrega a página solicitada dentro da tag section
		$("section").load(pagename+"/",function(response,status,info){
			if(status=="error"){
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("section").html(msg);
				}
			});
	}
	
//Define as configurações base de uma modal de aviso
	COLDIGO.exibirAviso = function(aviso){
		var modal = {
			title: "Mensagem",
			height: 250,
			width: 400,
			modal: true,
			buttons: {
				"OK": function(){
					$(this).dialog("close");
				}
			}
		};
		$("#modalAviso").html(aviso);
		$("#modalAviso").dialog(modal);
		};
});


//Exibe os valores financeiros no formato da moeda Real

COLDIGO.formatarDinheiro = function (valor){
	return valor.toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
}

COLDIGO.formatarData = function (data){
	  var datePart = data.match(/\d+/g),
	  year = datePart[0].substring(2),
	  month = datePart[1], day = datePart[2];

	  return day+'/'+month+'/'+year;
}


