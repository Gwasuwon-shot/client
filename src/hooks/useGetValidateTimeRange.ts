import { useQueries } from "react-query";

import { getValidateTimeRange } from "../api/getValidateTimeRange ";

export default function useGetValidateTimesRange(
  selectedDays: selectedDaysType[]
) {
  const validateTimeResult = useQueries(
    selectedDays.map((day) => ({
      queryKey: [
        "getValidateTimeRange",
        day.dayOfWeek,
        day.endTime,
        day.startTime,
      ],
      queryFn: () =>
        getValidateTimeRange({
          startTime: day.startTime,
          endTime: day.endTime,
        }),
    }))
  );
  return validateTimeResult;
}
