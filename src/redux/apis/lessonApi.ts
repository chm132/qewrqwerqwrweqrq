import { apiSlice } from '.';
import { CategoryLessonsResponse } from '../../types/Response/Category/CategoryLessonsType';
import { DetailLessonResponse } from '../../types/Response/Category/DetailLessonType';
import { HeaderSearchResponse } from '../../types/Response/Category/HeaderSearchType';
import { RowResponse } from '../../types/Response/Category/RowType';

interface ParamsProps {
  categoryId: number;
  pageNo?: string;
  keyword?: string;
}

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 헤더 검색창 get
    getHeaderSearch: builder.query<HeaderSearchResponse, string>({
      query: (keyword) => {
        return {
          url: `/lesson/search?keyword=${keyword}`,
          method: 'GET',
        };
      },
    }),

    // 홈 -> (인기교육, 최근 뜬 교육) get
    getOrderByLessons: builder.query<RowResponse, string>({
      providesTags: ['Lesson'],
      query: (condition) => {
        return {
          url: `/lesson?orderBy=${condition}`,
          method: 'GET',
        };
      },
    }),

    // 카테고리별 교육 get
    getCategoryLessons: builder.query<CategoryLessonsResponse, ParamsProps>({
      providesTags: ['Lesson'],
      query: ({ categoryId, pageNo, keyword }) => {
        let queryParams = '';

        if (keyword) {
          queryParams += `?keyword=${keyword}`;
        }

        if (pageNo) {
          queryParams += `${queryParams ? '&' : '?'}page=${pageNo}`;
        }

        return {
          url: `/lesson/category/${categoryId}${queryParams}`,
          method: 'GET',
        };
      },
    }),

    // 상세 교육 get
    getDetailLesson: builder.query<DetailLessonResponse, number>({
      providesTags: ['Lesson'],
      query: (lessonId) => {
        return {
          url: `/lesson/${lessonId}`,
          method: 'GET',
        };
      },
    }),

    // 교육 신청 (회원)
    applyLesson: builder.mutation({
      invalidatesTags: ['Lesson'],
      query: (lessonId) => ({
        method: 'POST',
        url: `/lesson/${lessonId}/member`,
        body: {},
      }),
    }),

    // 교육 삭제 (회원)
    deleteLesson: builder.mutation({
      invalidatesTags: ['Lesson'],
      query: (lessonId) => ({
        method: 'DELETE',
        url: `/lesson/${lessonId}/member`,
        body: {},
      }),
    }),

    // 설문조사 폼 제출
    postSurvey: builder.mutation({
      invalidatesTags: ['Lesson'],
      query: ({ ...post }) => ({
        method: 'POST',
        url: '/lessons/survey',
        body: post,
      }),
    }),
  }),
});

export const {
  useGetHeaderSearchQuery,
  useGetOrderByLessonsQuery,
  useGetCategoryLessonsQuery,
  useGetDetailLessonQuery,
  useApplyLessonMutation,
  useDeleteLessonMutation,
  usePostSurveyMutation,
} = categoryApi;
