package team.luckyturkey.danceservice.controller.responsedto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StandardSourceResponse {
    private Long sourceId;
    private Long memberId;
    private String sourceName;
    private String sourceStart;
    private String sourceEnd;
    private int sourceLength;
    private int sourceCount;
    private String sourceUrl;
    private String sourceThumbnailUrl;
    private List<StandardTagResponse> tagList;
    private LocalDateTime sourceDate;
}
