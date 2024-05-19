import { NO_CLASS_BANNER_TITLE } from "../../core/teacherHome/noClassBannerTitle";
import useGetTodayScheduleByTeacher from "../../hooks/useGetTodayScheduleByTeacher";
import useGetTodayScheduleExist from "../../hooks/useGetTodayScheduleExist";
import ClassPreviewBanner from "./banner/ClassPreviewBanner";
import NoclassBanner from "./banner/NoclassBanner";

export default function Banner() {
  const { todayScheduleByTeacher } = useGetTodayScheduleByTeacher();
  const { isTodaySchedule } = useGetTodayScheduleExist();

  function checkClassEnd() {
    return todayScheduleByTeacher === null;
  }

  function checkClassExist() {
    return isTodaySchedule;
  }

  return (
    <>
      {checkClassExist() ? (
        <>
          {checkClassEnd() ? (
            <NoclassBanner bannerTitle={NO_CLASS_BANNER_TITLE.endTodayClass} />
          ) : (
            <ClassPreviewBanner />
          )}
        </>
      ) : (
        <NoclassBanner bannerTitle={NO_CLASS_BANNER_TITLE.noTodayClass} />
      )}
    </>
  );
}
