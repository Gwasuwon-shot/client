import { useRecoilState } from "recoil";
import styled from "styled-components";
import { managingStatus } from "../../atom/mangeLesson/managingStatus";
import { MANAGE_LESSON_STATUS } from "../../core/manageLesson/manageLessonStatus";

export default function ManageLessonCategory() {
  const [status, setStatus] = useRecoilState(managingStatus);

  function handleChangeStatus(selectedCategory: string) {
    setStatus(selectedCategory);
  }

  function checkCategorySelected(selectedCategory: string) {
    return selectedCategory === status;
  }

  return (
    <CategoryWrapper>
      <Category
        $isLesson={true}
        $isSelected={checkCategorySelected(MANAGE_LESSON_STATUS.lesson)}
        onClick={() => handleChangeStatus(MANAGE_LESSON_STATUS.lesson)}>
        {MANAGE_LESSON_STATUS.lesson}
      </Category>
      <Category
        $isLesson={false}
        $isSelected={checkCategorySelected(MANAGE_LESSON_STATUS.payment)}
        onClick={() => handleChangeStatus(MANAGE_LESSON_STATUS.payment)}>
        {MANAGE_LESSON_STATUS.payment}
      </Category>
    </CategoryWrapper>
  );
}

const Category = styled.article<{ $isLesson: boolean; $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13.5075rem;
  height: 3.2rem;
  padding: 0.8rem;

  background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.white : "transparent")};

  border-radius: 0.8rem;

  cursor: pointer;

  ${({ theme }) => theme.fonts.body02};

  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.grey900 : theme.colors.grey400)};
`;

const CategoryWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 29.2rem;
  height: 4rem;
  padding: 0.8rem;
  margin-top: 1.8rem;

  background-color: ${({ theme }) => theme.colors.grey50};

  border-radius: 0.8rem;
`;
