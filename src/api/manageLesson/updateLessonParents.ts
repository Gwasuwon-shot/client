import { client } from "../axios";
import { getCookie } from "../cookie";

interface UpdateLessonParentsProps {
  lessonIdx: number;
  parentsPhone: string;
}

export async function updateLessonParents(scheduleData: UpdateLessonParentsProps) {
  const { lessonIdx, parentsPhone } = scheduleData;

  try {
    const data = await client.patch(
      `/api/lesson/parents`,
      { lessonIdx, parentsPhone },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Failed to update lesson parents:", error);
    throw error;
  }
}
