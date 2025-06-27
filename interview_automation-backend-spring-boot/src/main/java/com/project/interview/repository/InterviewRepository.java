package com.project.interview.repository;

import com.project.interview.dtos.InterviewStatisticDto;
import com.project.interview.entity.InterviewEntity;
import com.project.interview.enumeration.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface InterviewRepository extends JpaRepository<InterviewEntity, Long> {
    List<InterviewEntity> findByInterviewer_IdOrSearcher_Id(Long id, Long id1);

    List<InterviewEntity> findBySearcherId(Long id);

    List<InterviewEntity> findBySearcherIdAndEndDateTimeBetween(Long searcherId, LocalDateTime from, LocalDateTime to);

    List<InterviewEntity> findByStatusAndPlannedDateTimeBetween(InterviewStatus interviewStatus, LocalDateTime tomorrow, LocalDateTime endOfTomorrow);

    @Query("""
        SELECT COUNT(i) > 0 FROM interviews i
        WHERE i.interviewer.id = :id
        AND i.plannedDateTime >= :start
        AND i.plannedDateTime <= :end
    """)
    boolean interviewerHaveInterviewOn(@Param("id") Long id, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("""
        SELECT COUNT(i) > 0 FROM interviews i
        WHERE i.searcher.id = :id
        AND i.plannedDateTime >= :start
        AND i.plannedDateTime <= :end
    """)
    boolean searcherHaveInterviewOn(@Param("id") Long id, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    List<InterviewEntity> findAllBySearcherIdAndStatus(long searcherId, InterviewStatus status);



    @Query(value = """
    SELECT
        u.id AS interviewerId,
        u.last_name AS lastName,
        COUNT(DISTINCT i.id) AS totalInterviews,
        COUNT(iq.id) AS totalQuestions,
        ROUND(CAST(COUNT(iq.id) AS NUMERIC) / NULLIF(COUNT(DISTINCT i.id), 0), 2) AS avgQuestionsPerInterview
    FROM users u
    LEFT JOIN interviews i ON i.interviewer_id = u.id
    LEFT JOIN interview_questions iq ON iq.interview_id = i.id
    GROUP BY u.id, u.last_name
    ORDER BY totalInterviews DESC
""", nativeQuery = true)
    List<InterviewStatisticDto> getInterviewStatisticsNative();




}
