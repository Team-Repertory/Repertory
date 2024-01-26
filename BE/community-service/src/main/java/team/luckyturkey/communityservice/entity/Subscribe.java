package team.luckyturkey.communityservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subscribe {
    @Id
    private Long memberId;
    private Long followingMemberId;
    private Date subscribeDate;
}
