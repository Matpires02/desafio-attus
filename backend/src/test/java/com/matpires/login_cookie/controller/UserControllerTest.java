package com.matpires.login_cookie.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.matpires.login_cookie.dto.UpdateUserDto;
import com.matpires.login_cookie.entity.User;
import com.matpires.login_cookie.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Profile;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Profile("test")
class UserControllerTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void beforeAll() {
        userRepository.deleteAll();
    }

    @Test
    void shouldRegisterUser() throws Exception {

        String body = """
                {
                    "email": "teste@email.com",
                    "password": "123456"
                }
                """;

        mockMvc.perform(post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldNotRegisterUserWithSameEmail() throws Exception {

        String body = """
                {
                    "email": "teste@email.com",
                    "password": "123456"
                }
                """;

        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));

        mockMvc.perform(post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldUpdateWithoutId() throws Exception {

        String body = """
                {
                    "email": "teste@email.com",
                    "password": "123456"
                }
                """;

        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));

        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body)).andReturn();
        String responseBody =
                loginResult.getResponse().getContentAsString();

        // converte json
        JsonNode json = objectMapper.readTree(responseBody);

        // pega token
        String token = json.get("token").asText();

        var updatedBody = """
                {
                    "email": "teste1@email.com",
                    "password": "123456"
                }
                """;

        mockMvc.perform(put("/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body).header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldUpdateWithoutToken() throws Exception {

        String body = """
                {
                    "email": "teste@email.com",
                    "password": "123456"
                }
                """;

        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));

        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body)).andReturn();
        String responseBody =
                loginResult.getResponse().getContentAsString();

        // converte json
        JsonNode json = objectMapper.readTree(responseBody);

        // pega token
        String token = json.get("token").asText();

        var updatedBody = """
                {
                    "email": "teste1@email.com",
                    "password": "123456"
                }
                """;

        mockMvc.perform(put("/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldUpdate() throws Exception {

        String body = """
                {
                    "email": "teste@email.com",
                    "password": "123456"
                }
                """;

        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));

        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body)).andReturn();
        String responseBody =
                loginResult.getResponse().getContentAsString();

        // converte json
        JsonNode json = objectMapper.readTree(responseBody);

        // pega token
        String token = json.get("token").asText();

        User user = userRepository.findByEmail("teste@email.com").orElse(null);

        UpdateUserDto updateUserDto = new UpdateUserDto();
        updateUserDto.setId(user.getId());
        updateUserDto.setEmail("teste1@email.com");

        mockMvc.perform(put("/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateUserDto)).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("teste1@email.com"));
    }

}
