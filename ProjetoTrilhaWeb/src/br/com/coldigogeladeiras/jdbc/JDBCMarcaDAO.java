package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;
import br.com.coldigogeladeiras.modelo.Produto;

public class JDBCMarcaDAO implements MarcaDAO{
	
	private Connection conexao;
	
	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public List<Marca> buscar(){
		
		//Criação da instrução SQL para busca de todas as marcas
		String comando = "SELECT * FROM marcas";
		
		
		//Criação de uma lista para armazenar cada marca encontrada
		List<Marca> listMarcas = new ArrayList<Marca>();
		
		//Criação do objeto marca com valor null (ou seja, sem instanciá-lo)
		Marca marca = null;
		
		//Abertura do try-catch
		
		try {
			
			//Uso da conexão do banco para prepará-lo par auma instrução SQL
			
			Statement stmt = conexao.createStatement();
			
			//Execução da instrução criada previamente
			//e armazenamento do resultado no objeto rs
			
			ResultSet rs = stmt.executeQuery(comando);
			
			//Enquanto houver uma próxima linha no resultado
			while(rs.next()) {
				
				//Criação de instância de classe Marca
				marca = new Marca();
				
				//Recebimento dos 2 dados retornados do BD para cada linha encontrada
				int id = rs.getInt("id");
				String nome = rs.getString("nome");
				int status = rs.getInt("status");
				
				//Setando no objeto marca os valores encontrados
				marca.setStatus(status);
				
				if(marca.getStatus() == 0) {
					System.out.println("marca com status 0 pulada");
				}else {
					marca.setId(id); // POR QUESTÕES DE ECONOMIA DE PROCESSAMENTO VEM PRO ELSE 
					marca.setNome(nome);
					listMarcas.add(marca);
				}
			}
			
			
			//Caso alguma Exception seja gerada no Try, recebe-a no objeto "ex"
		}catch(Exception ex) {
			//Exibe a exceção na console
			ex.printStackTrace();
		}
		
		
		return listMarcas;
	}

	public List<JsonObject> buscarPorNome(String nome) {
		
				//Inicia criação do comando SQL de busca
		
				String comando = "SELECT marcas.*, marcas.nome as marca FROM marcas ";
				//Se o nome não estiver vazio ...
				
				if(!nome.equals("")) {
					//concatena no comando o WHERE buscando no nome do produto
					//o texto da variável nome
					
					comando +="WHERE nome LIKE '%" + nome + "%' ";
					
				}
				
				//Finaliza o comando ordenando alfabeticamente por
				//categora, marca e depois modelo.
				comando += "ORDER BY nome ASC, marcas.nome ASC";
				
				List<JsonObject> listaMarcas = new ArrayList<JsonObject>();
				JsonObject marca = null;
				
				try {
					Statement stmt = conexao.createStatement();
					ResultSet rs = stmt.executeQuery(comando);
					
					while(rs.next()) {
						
						int id = rs.getInt("id");
						String marcaNome = rs.getString("marca");
						int status = rs.getInt("status");
											
						marca = new JsonObject();
						marca.addProperty("id", id);
						marca.addProperty("marcaNome",marcaNome);
						
						marca.addProperty("status", status);
						
						listaMarcas.add(marca);
						
					}
					
				}catch(Exception e) {
					e.printStackTrace();
				}
				
				return listaMarcas;
	}

	public boolean inserir(Marca marca) {
		
		String comando = "INSERT INTO marcas "
				+"(id, nome) "
				+"VALUES (?,?)";
		PreparedStatement p;
		
		try {
			
			//Prepara o comando para execução no BD em que nos conectamos
			p = this.conexao.prepareStatement(comando);
			
			//Substitui no comando os "?" pelos valores do produto
			
			p.setInt(1, marca.getId());
			p.setString(2, marca.getNome());
			
			//Executa o comando no BD
			p.execute();
			
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean deletar(int id) {
		
		String comando = "DELETE FROM marcas WHERE id = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			p.execute();
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public Marca buscarPorId(int id) {
		
		String comando = "SELECT * FROM marcas WHERE marcas.id =?";
		Marca marca = new Marca();
		
		try {
			
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while(rs.next()) {
				
				String nomeMarca = rs.getString("nome");
				
				marca.setNome(nomeMarca);
				marca.setId(id);
	
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return marca;
	}
	
	public boolean alterar(Marca marca) {
		
		System.out.println("nome "+marca.getNome() + "id: "+marca.getId());
		
		String comando = "UPDATE marcas "
				+"SET nome=?" 
				+" WHERE id=?";
		
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, marca.getNome());
			p.setInt(2, marca.getId());
			p.executeUpdate();

		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean verificaExistencia(int id) {
		
		boolean retorno = true;
		
		String comando = "SELECT * FROM marcas WHERE id = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			
				if(rs.next()) { // A PROPRIA INSTRUÇÃO NEXT JA NOS AUXILIA, POIS SE EXISTE ALGO NA TABELA ELA EXECUTA O TRECHO, CASO NAO VAI PARA O ELSE
					retorno = true;
				}else {
					retorno = false;
				}
			}catch(SQLException e) {
			e.printStackTrace();
			retorno = false;
		}
		
		return retorno;
	}
	
	public boolean verificaProdutosCadastrados(int id) {
		
			String comando = "SELECT count(*) as quantidade_produtos FROM produtos WHERE marcas_id = ?";
			PreparedStatement p;
			int quantidade_produtos = 0;
			try {
				
				p = this.conexao.prepareStatement(comando);
				p.setInt(1, id);			
				ResultSet rs = p.executeQuery();
				
				if(rs.next()){
					quantidade_produtos = rs.getInt("quantidade_produtos");
				}
				
				if(quantidade_produtos> 0) {
					return false;
				}else {
					return true;
				}
			}catch(SQLException e) {	
				e.printStackTrace();
				return false;
			}
		
	}
	
	public boolean verificaMarcaExistente(Marca marca) { // verifica se a marca existe para evitar duplicação
		
		String comando = "SELECT marcas.nome FROM marcas";
		PreparedStatement p;
		
		try {
			
			p = this.conexao.prepareStatement(comando);
			
			ResultSet rs = p.executeQuery();
			
			while(rs.next()) {
				if(rs.getString("nome").equals(marca.getNome())) {
					return false;
				}
				
			}
			
			return true;
			
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

	}

	public boolean verificaStatus(int id) {
		
		System.out.println("id jdbc: "+id);
		
		String comando = "SELECT status from marcas where id =?";
		PreparedStatement p;
		
		try {
			
			p = this.conexao.prepareStatement(comando);
			p.setInt(1,id);
			ResultSet rs = p.executeQuery();
			
			while(rs.next()) {
	
				int status = rs.getInt("status");
				
				if(status == 1) {
					return true; //1
				}else{
					return false; // 2
				}
				
			}
			
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
		
	}
	
	public boolean alteraMarcaStatus(int newStatus,int id) {
		
		String comando = "UPDATE marcas SET status=? WHERE id=?";
		
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, newStatus);
			p.setInt(2, id);
			p.executeUpdate();

		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
}
