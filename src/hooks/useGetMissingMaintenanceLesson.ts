import { useQuery } from "react-query";

import { getMissingMaintenanceLesson } from "../api/getMissingMaintenanceLesson";

export default function useGetMissingMaintenanceLesson() {
  const { data: missingMaintenanceLessonList } = useQuery(
    ["getMissingMaintenanceLesson"],
    getMissingMaintenanceLesson,
    {},
  );

  return { missingMaintenanceLessonList };
}
