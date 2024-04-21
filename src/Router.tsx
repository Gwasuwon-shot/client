import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { removeCookie } from "./api/cookie";
import ConnectParentsAndTeacher from "./components/RegularLesson/ConnectParentsAndTeacher";
import AfterSignup from "./components/welcomeSignup/AfterSignup";
import AllowAlert from "./components/welcomeSignup/AllowAlert";
import ChangeSchedule from "./pages/ChangeSchedule";
import CompleteCheckAttendance from "./pages/CompleteCheckAttendance";
import EditShcedule from "./pages/EditSchedule";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LessonDetail from "./pages/LessonDetail";
import LessonInfo from "./pages/LessonInfo";
import LessonShare from "./pages/LessonShare";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import LoginLoading from "./pages/LoginLoading";
import ManageLessonDetail from "./pages/ManageLessonDetail";
import ManageLessonMain from "./pages/ManageLessonMain";
import MyPage from "./pages/Mypage";
import NoAttendanceCheck from "./pages/NoAttendanceCheck";
import OnBoarding from "./pages/OnBoarding";
import ParentCalendar from "./pages/ParentCalendar";
import RegisterCalendar from "./pages/RegisterCalendar";
import RegisterLesson from "./pages/RegisterLesson";
import RegisterPayment from "./pages/RegisterPayment";
import RegularLesson from "./pages/RegularLesson";
import RegularLessonCycle from "./pages/RegularLessonCycle";
import RegularLessonDate from "./pages/RegularLessonDate";
import Signup from "./pages/Signup";
import TimePickerPage from "./pages/TimePickerPage";
import TuitionPayment from "./pages/TuitionPayment";
import WelcomeSignup from "./pages/WelcomeSignup";
import PrivateRoute from "./utils/common/privateRoute";
import NaverRedirect from "./pages/NaverRedirect";

export default function Router() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={fallbackRender}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<OnBoarding />} />
            <Route path="/welcome" element={<WelcomeSignup />} />
            <Route path="/:lessonId" element={<ConnectParentsAndTeacher />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lesson-share" element={<LessonShare />} />
            <Route path="/login-loading" element={<LoginLoading />} />
            <Route path="/naver-redirect" element={<NaverRedirect />} />

            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/complete-check-attendance" element={<CompleteCheckAttendance />} />
              <Route path="/manage-lesson" element={<ManageLessonMain />} />
              <Route path="/manage-lesson/:manageLessonId" element={<ManageLessonDetail />} />
              <Route path="/register-payment/:manageLessonId" element={<RegisterPayment />} />
              <Route path="/parent-calendar" element={<ParentCalendar />} />
              <Route path="/register-lesson" element={<RegisterLesson />} />
              <Route path="/regular-lesson-cycle" element={<RegularLessonCycle />} />
              <Route path="/regular-lesson-date" element={<RegularLessonDate />} />
              <Route path="/regular-lesson" element={<RegularLesson />} />
              <Route path="/register-calendar" element={<RegisterCalendar />} />
              <Route path="/lesson-detail/:lessonId" element={<LessonDetail />} />
              <Route path="/time-picker" element={<TimePickerPage />} />
              <Route path="/schedule" element={<ChangeSchedule />} />
              <Route path="/tuition-payment" element={<TuitionPayment />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/no-attendance-check" element={<NoAttendanceCheck />} />
              <Route path="/lesson-info/:lessonId" element={<LessonInfo />} />
              <Route path="/edit-lessonschedule" element={<EditShcedule />} />
              <Route path="/alert" element={<AllowAlert />} />
              <Route path="/tree" element={<AfterSignup />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

function fallbackRender({ error, resetErrorBoundary }: any) {
  if (error.response) {
    if (error.response.data.code === 401) {
      resetErrorBoundary();
      removeCookie("accessToken");
      return <Navigate to="/" />;
    }
  } else {
    return <ErrorPage resetErrorBoundary={resetErrorBoundary} />;
  }
}
