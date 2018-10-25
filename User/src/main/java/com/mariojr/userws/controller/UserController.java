package com.mariojr.userws.controller;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}
