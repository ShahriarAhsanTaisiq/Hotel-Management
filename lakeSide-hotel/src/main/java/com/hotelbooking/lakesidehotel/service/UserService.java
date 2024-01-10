package com.hotelbooking.lakesidehotel.service;

import com.hotelbooking.lakesidehotel.exception.UserAlreadyExistException;
import com.hotelbooking.lakesidehotel.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    User registerUser(User user) throws UserAlreadyExistException;
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
