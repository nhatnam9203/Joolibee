import { useSelector } from 'react-redux';

export function useStore(props) {
  const stores = useSelector((state) => state.store.stores);
  return stores;
}
