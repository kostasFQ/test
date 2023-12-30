export const useLocalStorage = () => {
  const setStorageValue = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));
  const getStorageValue = <T>(key: string): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  };
  const deleteStorageValue = (key: string) => localStorage.removeItem(key);
  const clearStorage = () => localStorage.clear();

  return { setStorageValue, getStorageValue, deleteStorageValue, clearStorage };
};
