package com.mariojr.userws.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mariojr.userws.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	User findByCpf(String cpf);
}
