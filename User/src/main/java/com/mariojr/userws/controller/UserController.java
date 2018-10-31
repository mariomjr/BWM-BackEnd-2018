package com.mariojr.userws.controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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

	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/user/{cpf}")
    public ResponseEntity<ResponseDto<User>> getByCpf(@PathVariable("cpf") String cpf) {
		User user = userRepository.findByCpf(cpf);
		if(user!= null) {
			return ResponseEntity.ok(new ResponseDto<User>(user, ""));
		}
        return ResponseEntity.ok(new ResponseDto<User>(null, "Usuário não encontrado"));
    }
	
	@GetMapping("/user")
	public ResponseEntity<ResponseDto<List<User>>> getAllUsers() {
		List<User> users = userRepository.findAll();
		if(users != null) {
			return ResponseEntity.ok(new ResponseDto<List<User>>(users, ""));
		}
        return ResponseEntity.ok(new ResponseDto<List<User>>(null, "Usuários não encontrado"));
	}
	
	@PostMapping(path = "/user", consumes = "application/json", produces = "application/json")
	public ResponseEntity<ResponseDto<User>> createUser(@RequestBody User data) {
		userRepository.save(data);
		return ResponseEntity.ok(new ResponseDto<User>(data, "Criado!"));
	}
}
