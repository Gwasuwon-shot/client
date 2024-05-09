import { useState } from "react";
import ShareComplete from "../components/lessonShare/ShareComplete";
import ShareMain from "../components/lessonShare/ShareMain";
import SharePreview from "../components/lessonShare/SharePreview";
export interface handleMoveToPageProps {
  handleMoveToPage: (page: string) => void;
}

export default function LessonShare() {
  const [shareState, setShareState] = useState<string>("M");

  function handleMoveToPage(page: string) {
    setShareState(page);
  }

  switch (shareState) {
    // case 0:
    //   navigate(-1);
    //   break;
    case "M":
      return <ShareMain handleMoveToPage={handleMoveToPage} />; //0
    case "C":
      return <ShareComplete handleMoveToPage={handleMoveToPage} />; //25
    case "P":
      return <SharePreview handleMoveToPage={handleMoveToPage} />; //50 | 75
  }
}
