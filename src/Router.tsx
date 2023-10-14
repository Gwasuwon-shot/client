import { BrowserRouter, Route, Routes } from "react-router-dom";

import ConnectParentsAndTeacher from "./components/RegularLesson/ConnectParentsAndTeacher";
import ParentsFooter from "./components/common/ParentsFooter";
import ChangeSchedule from "./pages/ChangeSchedule";
import CompleteCheckAttendance from "./pages/CompleteCheckAttendance";
import EditShcedule from "./pages/EditSchedule";
import Error from "./pages/Error";
import Home from "./pages/Home";
import LessonDetail from "./pages/LessonDetail";
import LessonInfo from "./pages/LessonInfo";
import LessonShare from "./pages/LessonShare";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import ManageLessonDetail from "./pages/ManageLessonDetail";
import ManageLessonMain from "./pages/ManageLessonMain";
import Mypage from "./pages/Mypage";
import NoAttendanceCheck from "./pages/NoAttendanceCheck";
import OnBoarding from "./pages/OnBoarding";
import ParentCalendar from "./pages/ParentCalendar";
import RegisterCalendar from "./pages/RegisterCalendar";
import RegisterLesson from "./pages/RegisterLesson";
import RegisterPayment from "./pages/RegisterPayment";
import RegularLesson from "./pages/RegularLesson";
import Signup from "./pages/Signup";
import TimePickerPage from "./pages/TimePickerPage";
import TuitionPayment from "./pages/TuitionPayment";
import WelcomeSignup from "./pages/WelcomeSignup";
import PrivateRoute from "./utils/common/privateRoute";
import MissingMaintenanceLesson from "./pages/MissingMaintenanceLesson";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<OnBoarding />} />
        <Route path="/welcome" element={<WelcomeSignup />} />
        <Route path="/:lessonId" element={<ConnectParentsAndTeacher />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lesson-share" element={<LessonShare />} />
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/complete-check-attendance" element={<CompleteCheckAttendance />} />
          <Route path="/manage-lesson" element={<ManageLessonMain />} />
          <Route path="/manage-lesson/:manageLessonId" element={<ManageLessonDetail />} />
          <Route path="/register-payment/:manageLessonId" element={<RegisterPayment />} />
          <Route path="/parent-calendar" element={<ParentCalendar />} />
          <Route path="/register-lesson" element={<RegisterLesson />} />
          <Route path="/regular-lesson" element={<RegularLesson />} />
          <Route path="/register-calendar" element={<RegisterCalendar />} />
          <Route path="/lesson-detail/:lessonId" element={<LessonDetail />} />
          <Route path="/time-picker" element={<TimePickerPage />} />
          <Route path="/schedule" element={<ChangeSchedule />} />
          <Route path="/tuition-payment" element={<TuitionPayment />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/no-attendance-check" element={<NoAttendanceCheck />} />
          <Route path="/lesson-info/:lessonId" element={<LessonInfo />} />
          <Route path="/edit-lessonschedule" element={<EditShcedule />} />
          <Route path="/footer" element={<ParentsFooter />} />
          <Route path="/missing-maintenancelesson" element={<MissingMaintenanceLesson />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
