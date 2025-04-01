import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const isPostsLoading = posts.status === 'loading'; 
  const isTagsLoading = posts.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);
  
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
          isPostsLoading ? (
          <Post key={index} isLoading={true}/>) : (
            <Post
              id={obj.isPublic ? obj._id : userData?._id === obj.user._id ? obj._id : ''}
              title={obj.isPublic ? obj.title : userData?._id === obj.user._id ? obj.title : ''}
              imageUrl={obj.imageUrl ? `http://localhost:4300${obj.imageUrl}` : 'http://localhost:4300/noavatar.png'}
              user={obj.isPublic ? obj.user : userData?._id === obj.user._id ? obj.user : ''}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
  //            commentsCount={obj.comments.length}
              tags={obj.isPublic ? obj.tags : userData?._id === obj.user._id ? obj.tags : []}
              isEditable={userData?._id === obj.user._id}
            />
          )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: '',
                },
                text: 'Если Вы видите этот коментарий, то комментарии не реализованы',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
