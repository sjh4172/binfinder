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
@RequestMapping("/api/v1/trash-cans/{id}/vote")
public class VoteController {
    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    // 좋아요, 싫어요 투표하기
    @PostMapping("")
    public ResponseEntity<VoteDto.Response> createVote(@Valid @RequestBody VoteDto.CreateRequest createRequest) {
        VoteDto.Response response = voteService.createVote(createRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 투표 수정하기
    @PutMapping("/{voteId}")
    public ResponseEntity<VoteDto.Response> updateVote(@PathVariable Long voteId, @Valid @RequestBody VoteDto.CreateRequest createRequest) {
        VoteDto.Response response = voteService.updateVote(createRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @PostMapping("")
//    public ResponseEntity<VoteDto.Response> createOrUpdateVote(
//            @PathVariable Long id,
//            @RequestBody VoteDto.CreateRequest createRequest,
//            @AuthenticationPrincipal UserDetailsImpl userDetails) {
//
//        Long memberId = userDetails.getId();
//        VoteDto.Response responseDto = voteMapper.voteToResponseDto(
//                voteService.createOrUpdateVote(id, memberId, createRequest));
//
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentRequest()
//                .replacePath("/api/v1/trash-cans/{id}/vote/{voteId}")
//                .buildAndExpand(id, responseDto.getId())
//                .toUri();
//
//        HttpStatus status = responseDto.isCreated() ? HttpStatus.CREATED : HttpStatus.OK;
//        return ResponseEntity.status(status).location(location).body(responseDto);
//    }

    // 투표 삭제하기
    @DeleteMapping("/{voteId}")
    public ResponseEntity<Void> deleteVote(@PathVariable Long voteId) {
        voteService.deleteVote(voteId);
        return ResponseEntity.noContent().build();
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

//		return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
        return ResponseEntity.badRequest().body(ErrorResponse.of(e.getBindingResult()));
    }
}

