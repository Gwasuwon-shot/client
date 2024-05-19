import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { newSocialUser } from "../../atom/signup/signup";

export default function useReverseRole() {
  const user = useRecoilValue(newSocialUser);
  const [reverseRole, setReverseRole] = useState("");

  useEffect(() => {
    if (user.role === "부모님") {
      setReverseRole("선생님");
    } else {
      setReverseRole("학부모님");
    }
  }, [user.role]);

  return { reverseRole };
}
