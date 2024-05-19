import { client } from "./axios";

export async function getValidateTimeRange(props: TimePeriod) {
  const { startTime, endTime } = props;
  await client.get(`/api/time/validation/?start-time=${startTime}&end-time=${endTime}`);
}
