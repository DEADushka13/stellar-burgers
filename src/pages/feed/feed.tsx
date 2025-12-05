import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedOrders, getFeedLoading } from '../../features/selectors/feed';
import { fetchFeed } from '../../features/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getFeedOrders);
  const loading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
