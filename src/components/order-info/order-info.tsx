import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../features/selectors/ingredients';
import { getCurrentOrder } from '../../features/selectors/order';
import { fetchOrderByNumber } from '../../features/slices/orderSlice';
import { AppDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const orderData = useSelector(getCurrentOrder);
  const ingredients = useSelector(getIngredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(parseInt(number)));
    }
  }, [dispatch, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string | number) => {
        if (!acc[item]) {
          const ingredient = ingredients.find(
            (ing: { _id: any }) => ing._id === item
          );
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    // const total = Object.values(ingredientsInfo).reduce(
    //   (acc, item) => acc + item.price * item.count,
    //   0
    // );

    const total = Object.values(ingredientsInfo)
      .map((item) => item as TIngredient & { count: number })
      .reduce(
        (acc: number, item: TIngredient & { count: number }) =>
          acc + item.price * item.count,
        0
      );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
