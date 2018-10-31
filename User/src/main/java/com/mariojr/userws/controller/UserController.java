package com.mariojr.userws.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mariojr.userws.model.ResponseDto;
import com.mariojr.userws.model.User;
import com.mariojr.userws.repository.UserRepository;

@RestController
public class UserController {

	private final String URL_NODE = "http://localhost:3000/enderecos";

	@Autowired
	UserRepository userRepository;

	@GetMapping(value = "/user/{cpf}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<ResponseDto<Map<String, Object>>> getByCpf(@PathVariable("cpf") String cpf) {
		Map<String, Object> resposta = new HashMap<>();
		User user = userRepository.findByCpf(cpf);

		String endereco = pegaEnderecoDoNode(cpf);
		if (user != null) {
			resposta.put("usuario", user);
			resposta.put("endereco", endereco);
			return ResponseEntity.ok(new ResponseDto<Map<String, Object>>(resposta, ""));
		}
		return ResponseEntity.ok(new ResponseDto<Map<String, Object>>(null, "Usuário não encontrado"));
	}

	@GetMapping("/user")
	public ResponseEntity<ResponseDto<List<User>>> getAllUsers() {
		List<User> users = userRepository.findAll();
		if (users != null) {
			return ResponseEntity.ok(new ResponseDto<List<User>>(users, ""));
		}
		return ResponseEntity.ok(new ResponseDto<List<User>>(null, "Usuários não encontrado"));
	}

	@PostMapping(path = "/user", consumes = "application/json", produces = "application/json")
	public ResponseEntity<ResponseDto<User>> createUser(@RequestBody User data) {
		userRepository.save(data);
		return ResponseEntity.ok(new ResponseDto<User>(data, "Criado!"));
	}

	public String pegaEnderecoDoNode(String cpf) {
		String endereco = "";
		try {
			URL url = new URL(URL_NODE);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("Content-Type", "application/json");
			con.setConnectTimeout(5000);
			con.setReadTimeout(5000);

			Map<String, String> parameters = new HashMap<>();
			parameters.put("cpf", cpf);

			con.setDoOutput(true);

			endereco = getResponseFromNode(cpf);

			con.disconnect();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return endereco;
	}

	public String getResponseFromNode(String cpf) throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(
				((HttpURLConnection) (new URL(URL_NODE + "/" + cpf)).openConnection()).getInputStream(),
				Charset.forName("UTF-8")));
		String inputLine;
		StringBuffer content = new StringBuffer();
		while ((inputLine = in.readLine()) != null) {
			content.append(inputLine);
		}
		in.close();
		System.out.println(content);
		return content.toString();
	}
}