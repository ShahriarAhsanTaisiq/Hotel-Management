package com.hotelbooking.lakesidehotel.service;

import com.hotelbooking.lakesidehotel.exception.RoleAlreadyExistException;
import com.hotelbooking.lakesidehotel.exception.UserAlreadyExistException;
import com.hotelbooking.lakesidehotel.model.Role;
import com.hotelbooking.lakesidehotel.model.User;

import java.util.List;

public interface RoleService {
    List<Role> getRole();
    Role createRole(Role theRole) throws RoleAlreadyExistException;
    void deleteRole(Long roleId);
    Role findByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId) throws UserAlreadyExistException;
    Role removeAllUsersFromRole(Long roleId);
}
