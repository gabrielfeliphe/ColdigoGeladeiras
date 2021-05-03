function validaFaleConosco()
{
	if(document.frmfaleconosco.txtnome.value==""){
		alert("Preencha o campo nome.");
		document.frmfaleconosco.txtnome.focus();
		return false;
	}
	
	else if (document.frmfaleconosco.txtfone.value==""){	
		alert("Preencha o campo telefone.");
		document.frmfaleconosco.txtfone.focus();
		return false;
	}
	
	else if (document.frmfaleconosco.txtemail.value==""){	
		alert("Preencha o campo e-mail.");
		document.frmfaleconosco.txtemail.focus();
		return false;
	}
	
	else if (document.frmfaleconosco.selmotivo.value==""){	
		alert("Preencha o motivo.");
		document.frmfaleconosco.selmotivo.focus();
		return false;
	}
	
	else if (document.frmfaleconosco.selmotivo.value=="PR" && document.frmfaleconosco.selproduto.value==""){
		alert("Preencha o Produto.");
		document.frmfaleconosco.selproduto.focus();
		return false;
	}
	
	else if (document.frmfaleconosco.txacomentario.value==""){	
		alert("Preencha o comentário.");
		document.frmfaleconosco.txacomentario.focus();
		return false;
	}
	
	
	return true;
}

function verificaMotivo(motivo){
	var elemento = document.getElementById("opcaoProduto");
	
	console.log(motivo);
	
	// se o valor da variável motivo for "PR"
	
	if(motivo=="PR"){
		// criamos um elemento (tag) <select> e guardamos na variável homonima
		var select = document.createElement("select");
		// setamos nesse novo select o atributo 'name' com o valor 'selproduto'
		select.setAttribute("name","selproduto");
		//conteúdo atual da variavel select:
		//<select name "selproduto"></select>
		
		
		// criamos um elemento (tag) <option> e guardamos na variável homônima
		var option = document.createElement("option");
		// Setamos nesse novo option o atributo 'value' com o valor vazio
		option.setAttribute ("value","");
		// Criamos um nó de teto "escolha" e gravamos na variável 'texto'
		var texto = document.createTextNode("Escolha");
		// Colocamos o nó de texto criado como "filho" da tag option criada
		option.appendChild(texto);
		// conteúdo atual da variável option;
		// <option value="">Escolha</option>
		
		//Colocamos o ption criado como "filho" da tag select criada
		select.appendChild(option);
		//conteúdo atual da variável select:
		//<select name="selproduto"><option value="">Escolha</option></select>
		
		//Criamos um elemento (tag) <option> e guardamos na variável homônima
		var option = document.createElement("option");
		//setamos nesse novo option o atributo 'value' com valor "FR"
		option.setAttribute("value","FR");
		//Criamos um nó de texto "freezer" e gravamos na variável 'texto'
		var texto = document.createTextNode("Freezer");
		//Colocamos o nó de texto criado como "filho" da tag option criada
		option.appendChild(texto);
		//conteúdo atual da variável option:
		//<option value="FR">Freezer</option>
		
		//Colocamos o option criado como "filho" da tag select criada
		select.appendChild(option);
		//conteúdo atual da variável select:
		/*
		 <select name="selproduto">
		 <option value="">Escolha</option><option value = "FR">Freezer</option>
		 </select>
		 */
		
		//Criamos um elemento (tag) <option> e guardamos na variavel homonima
		var option = document.createElement("option");
		//Setamos nesse novo option o atributo 'value' com o valor "GE"
		option.setAttribute("value","GE");
		//Criamos um nó de texto "Geladeira" e gravamos na variável 'texto'
		var texto = document.createTextNode("Geladeira");
		//Colocamos o nó de texto criado como "filho" da tag option criada
		option.appendChild(texto);
		//Conteúdo atual da variável option:
		//<option value= "GE">Geladeira</option>
		
		// Colocamos o option criado como "filho" da tag select criada
		select.appendChild(option);
		// conteúdo atual da variável select:
		
	/*
	 <select name = "selproduto">
	 <option value="">Escolha</option><option value = "FR">Freezer</option><option value ="GE">Geladeira</option>
	 </select>
	 */
		 
	//Colocamos o select criado como "filho" da tag div capturada no inicio da função
	elemento.appendChild(select);
	// se o valor da variável motivo não for "PR"...
	}else{
		if(elemento.firstChild){
			elemento.removeChild(elemento.firstChild);
		}
	}
		
		
}// fim verificaMotivo

//Assim que o documento HTML for carregado por completo...
$(document).ready(function(){
	
	//Carrega o cabeçalho, menu e rodapé aos repectivos locais
	$("header").load("/ProjetoTrilhaWeb/pages/site/general/cabecalho.html");
	$("nav").load("/ProjetoTrilhaWeb/pages/site/general/menu.html");
	$("footer").load("/ProjetoTrilhaWeb/pages/site/general/rodape.html");
	
});