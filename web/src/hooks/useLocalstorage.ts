

const useLocalstorage = () => {
  const setItem = (key: string, values: unknown ) => {
    localStorage.setItem(key, JSON.stringify(values));
  };

  const getItem = (key: string) => {
    return JSON.parse(String(localStorage.getItem(key)));
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const isItem = (key: string): boolean => {
    return !!localStorage.getItem(key);
  };

  return { setItem, getItem, removeItem, isItem };
};

export default useLocalstorage;
