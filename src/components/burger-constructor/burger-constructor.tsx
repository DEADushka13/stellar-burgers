import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { getConstructorBun, getConstructorIngredients, getConstructorTotalPrice } from '../../features/selectors/constructor';
import { getOrderLoading, getCurrentOrder } from '../../features/selectors/order';
import { selectIsAuth } from '../../features/selectors/user';
import { clearConstructor } from '../../features/slices/constructorSlice';
import { createOrder, clearOrder } from '../../features/slices/orderSlice';
import { AppDispatch } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
    const dispatch = useDispatch<AppDispatch>();
  const bun = useSelector(getConstructorBun);
  const ingredients = useSelector(getConstructorIngredients);
  const orderRequest = useSelector(getOrderLoading);
  const orderModalData = useSelector(getCurrentOrder);
  const isAuth = useSelector(selectIsAuth);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuth) {
      // Перенаправляем на страницу логина
      window.location.href = '/login';
      return;
    }

    const orderIngredients = [
      bun._id,
      ...(ingredients || []).map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      bun._id
    ];

    dispatch(createOrder(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useSelector(getConstructorTotalPrice);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};