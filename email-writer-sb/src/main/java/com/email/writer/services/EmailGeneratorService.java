package com.email.writer.services;

import com.email.writer.Dto.EmailRequest;
import com.email.writer.credentials.GeminiCredentials;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailGeneratorService {

    private final WebClient webClient;
    private final GeminiCredentials geminiCredentials;

    public String generateEmailReply(EmailRequest emailRequest) {

        // build the prompt
        String prompt = buildPrompt(emailRequest);

        // craft a request
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                }
        );

        // Do request and get response
        String response = queryGeminiApi(
                geminiCredentials.getGeminiApiUrl(),
                geminiCredentials.getGeminiApiKey(),
                requestBody
        );

        // Extract response and return
        return extractResponseContent(response);
    }

    private String buildPrompt(EmailRequest emailRequest) {
            StringBuilder prompt = new StringBuilder();
            prompt.append(
                    "Write a clear, concise, and professional email reply to the message provided below. Maintain a respectful and courteous tone, address all points mentioned in the original email, and keep the language business-appropriate. Do not include a subject line in your response. Original email content:"
            );
            if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
                prompt.append("Use a ").append(emailRequest.getTone()).append(" tone");
            }
            prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
            return prompt.toString();
    }

    private String queryGeminiApi(String url, String key, Map requestBody) {
        return webClient.post()
                .uri(url)
                .header("Content-Type", "application/json")
                .header("X-goog-api-key", key)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    private String extractResponseContent(String response) {
        try {
            // mapper to convert class to json and vise versa
            ObjectMapper mapper = new ObjectMapper();
            // readTree convert the response to the tree like structure
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Error processing the request: " + e.getMessage();
        }

    }
}
