import { useQuery } from "react-query";
import { getUserName } from "../api/getUserName";

export default function useGetUserName() {
  // 선생님 : 메인페이지 뷰 (홈)- 배너(가장 가까운 수업)
  //   api 패칭
  const { data: teacherName } = useQuery(["userName"], getUserName, {
    onError: (error) => {
      console.log(error);
    },
  });

  return { teacherName };
}
