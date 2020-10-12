import { changeLanguage } from '@slices/setting';
import { useSelector, useDispatch } from 'react-redux';

const useChangeLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.setting.language);

  const setLanguage = async (lang) => {
    await dispatch(changeLanguage(lang));
  };

  return [language, setLanguage];
};

export default useChangeLanguage;
