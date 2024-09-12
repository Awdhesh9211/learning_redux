import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todos',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  
  endpoints: (builder) => ({
    
    getTodo: builder.query({
      query: () => `todos`,
      providesTags: ['todos'],
    }),
    addTodo: builder.mutation({
        query: ({ title ,completed}) => ({
          url: 'todos',
          method: 'POST',
          body: { title ,completed},
        }),
        invalidatesTags: ['todos'],
    }),
    updateTodo: builder.mutation({
        query: ({_id,title,completed}) => ({
          url: `todos/${_id}`,
          method: 'PUT',
          body: {title,completed},
        }),
        invalidatesTags: ['todos'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos'],
    }),
  }),
});

export const {
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;
