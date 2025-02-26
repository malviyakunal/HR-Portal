package com.hr.server.repository;

import com.hr.server.model.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // You can define custom queries if needed. Example:
     Optional<Role> findByRoleName(String roleName);
}
