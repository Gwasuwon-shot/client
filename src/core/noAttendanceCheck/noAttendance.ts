export const NO_ATTENDNACE_CHECK = {
  code: 200,
  message: "선생님의 출결상태 누락 스케쥴 조회 성공",
  data: {
    missingAttendanceDateList: [
      {
        date: "2023-07-07",
        missingAttendanceScheduleList: [
          {
            lesson: {
              idx: 2,
              studentName: "김유나",
              subject: "국어",
            },
            schedule: {
              idx: 3,
              startTime: "18:00",
              endTime: "20:00",
              count: 3,
            },
          },
          {
            lesson: {
              idx: 2,
              studentName: "김유나",
              subject: "국어",
            },
            schedule: {
              idx: 3,
              startTime: "18:00",
              endTime: "20:00",
              count: 4,
            },
          },
        ],
      },
      {
        date: "2023-07-10",
        missingAttendanceScheduleList: [
          {
            lesson: {
              idx: 2,
              studentName: "김유나",
              subject: "국어",
            },
            schedule: {
              idx: 3,
              startTime: "18:00",
              endTime: "20:00",
              count: 2,
            },
          },
          {
            lesson: {
              idx: 2,
              studentName: "김유나",
              subject: "국어",
            },
            schedule: {
              idx: 3,
              startTime: "18:00",
              endTime: "20:00",
              count: 1,
            },
          },
        ],
      },
    ],
  },
};
