//package com.codestates.oauth2.service;
//
//import com.codestates.oauth2.entity.OAuthUser;
//import com.codestates.oauth2.repository.OAuthUserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class OAuthUserService {
//    @Autowired
//    private OAuthUserRepository oauthUserRepository;
//
//    public void saveOAuthUser(String email) {
//        OAuthUser user = new OAuthUser();
//        user.setEmail(email);
//        oauthUserRepository.save(user);
//    }
//
//    public OAuthUser findOAuthUserByEmail(String email) {
//        return oauthUserRepository.findByEmail(email);
//    }
//}
