package com.codestates.domain.vote;

import com.codestates.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/votes")
public class VoteController {
    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping
    public ResponseEntity<VoteDto.Response> createOrUpdateVote(@RequestBody VoteDto.CreateRequest createRequest) {
        try {
            VoteDto.Response response = voteService.createOrUpdateVote(createRequest);
            if (response == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(response);
        } catch (BusinessLogicException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/members/{memberId}")
    public ResponseEntity<List<VoteDto.Response>> getVotesByMember(@PathVariable Long memberId) {
        List<VoteDto.Response> responseList = voteService.getVotesByMember(memberId);
        return ResponseEntity.ok().body(responseList);
    }

    @GetMapping("/trash-cans/{trashCanId}")
    public ResponseEntity<List<VoteDto.Response>> getVotesByTrashCan(@PathVariable Long trashCanId) {
        List<VoteDto.Response> responseList = voteService.getVotesByTrashCan(trashCanId);
        return ResponseEntity.ok().body(responseList);
    }

    @ExceptionHandler
    public ResponseEntity handleException(MethodArgumentNotValidException e) {
        // (1)
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();

        // (2)
        List<ErrorResponse.FieldError> errors =
                fieldErrors.stream()
                        .map(error -> new ErrorResponse.FieldError(
                                error.getField(),
                                error.getRejectedValue(),
                                error.getDefaultMessage()))
                        .collect(Collectors.toList());

        return ResponseEntity.badRequest().body(ErrorResponse.of(e.getBindingResult()));
    }
}

