package com.hotelbooking.lakesidehotel.service;

import com.hotelbooking.lakesidehotel.exception.RoleAlreadyExistException;
import com.hotelbooking.lakesidehotel.exception.UserAlreadyExistException;
import com.hotelbooking.lakesidehotel.model.Role;
import com.hotelbooking.lakesidehotel.model.User;
import com.hotelbooking.lakesidehotel.repository.RoleRepository;
import com.hotelbooking.lakesidehotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    @Override
    public List<Role> getRole() {
        return roleRepository.findAll();
    }
    @Override
    public Role createRole(Role theRole) throws RoleAlreadyExistException {
        String roleName = "ROLE_"+ theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if (roleRepository.existsByName(role)){
            throw new RoleAlreadyExistException(theRole.getName()+"role already exist.");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }

        throw new UsernameNotFoundException("User not found.");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) throws UserAlreadyExistException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && user.get().getRoles().contains(roleRepository.findById(roleId).get())){
            throw new UserAlreadyExistException(
                    user.get().getFirstName() + "is already assigned to the " + roleRepository.findById(roleId).get().getName() + "role");
        }
        if (roleRepository.findById(roleId).isPresent()){
            roleRepository.findById(roleId).get().assignRoleToUser(user.get());
            roleRepository.save(roleRepository.findById(roleId).get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        role.get().removeAllUsersFromRole();
        return roleRepository.save(role.get());
    }
}
