package team.luckyturkey.danceservice.event.listner;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import team.luckyturkey.danceservice.domain.document.Repertory;
import team.luckyturkey.danceservice.domain.entity.Source;
import team.luckyturkey.danceservice.domain.entity.id.SourceRepertoryPK;
import team.luckyturkey.danceservice.domain.entity.mapper.SourceRepertory;
import team.luckyturkey.danceservice.event.RepertoryDeletedEvent;
import team.luckyturkey.danceservice.event.RepertorySavedEvent;
import team.luckyturkey.danceservice.repository.jpa.SourceRepertoryRepository;

import java.time.LocalDateTime;
import java.util.List;

import static jakarta.transaction.Transactional.TxType.REQUIRES_NEW;

@Component
@RequiredArgsConstructor
public class RepertoryEventListener {

    private final SourceRepertoryRepository sourceRepertoryRepository;

    @Transactional(REQUIRES_NEW)
    @EventListener
    public void repertorySavedEventListener(RepertorySavedEvent event){
        Repertory savedRepertory = event.getRepertory();
        List<Long> sourceIdList = savedRepertory.getSourceList();

        for (Long sourceId : sourceIdList) {
            SourceRepertory sourceRepertory = SourceRepertory.builder()
                    .id(new SourceRepertoryPK(savedRepertory.getId(), sourceId))
                    .source(Source.builder()
                            .id(sourceId)
                            .sourceDate(LocalDateTime.now())
                            .memberId(savedRepertory.getMemberId())
                            .build())
                    .build();

            sourceRepertoryRepository.save(sourceRepertory);
        }
    }


    @Transactional(REQUIRES_NEW)
    @EventListener
    public void repertoryDeletedEventListener(RepertoryDeletedEvent event){
        Repertory deletedRepertory = event.getRepertory();
        sourceRepertoryRepository.deleteByIdRepertoryId(deletedRepertory.getId());
    }
}
