package com.codestates.domain.plogging.mapper;

import com.codestates.domain.plogging.dto.PlogDetailDto;
import com.codestates.domain.plogging.entity.Plogging;
import org.springframework.stereotype.Component;

@Component
public class CustomMapper {
	public PlogDetailDto ploggingToPlogDetailDto(Plogging plogging) {
		if ( plogging == null ) {
			return null;
		}

		PlogDetailDto plogDetailDto = new PlogDetailDto();
		plogDetailDto.setUserName(plogging.getUsername());
		plogDetailDto.setMember( plogging.getMember() );
		plogDetailDto.setP_id( plogging.getP_id() );
		plogDetailDto.setP_title( plogging.getP_title() );
		plogDetailDto.setP_content( plogging.getP_content() );
		plogDetailDto.setCheckLike( plogging.isCheckLike() );
		plogDetailDto.setLikes( plogging.getLikes() );
		plogDetailDto.setCreatedAt( plogging.getCreatedAt() );
		plogDetailDto.setModifiedAt( plogging.getModifiedAt() );
		plogDetailDto.setP_commentCount( plogging.getP_commentCount() );

		return plogDetailDto;
	}
}
