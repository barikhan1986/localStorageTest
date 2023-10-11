export default interface LocalStorageItem {
  key?: string;
  value: string;
  expiryInMilliseconds: number;
}
const setItem = (key: string, value: string, expiryInMilliseconds: number) => {
  const now = new Date().getTime();
  const newItem: LocalStorageItem = {
    value: value,
    expiryInMilliseconds: now + expiryInMilliseconds,
  };

  localStorage.setItem(key, JSON.stringify(newItem));
};

const getItem = (key: string) => {
  const storedItem = localStorage.getItem(key);
  const now = new Date().getTime();

  if (storedItem) {
    const item = JSON.parse(storedItem);
    if (item.expiryInMilliseconds >= now) {
      return item.value;
    } else {
      //expired item, we should remove it
      removeItem(key);
    }
  }
  return null;
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

const getAllItems = () => {
  let items: LocalStorageItem[] = [];
  const now = new Date().getTime();
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const value = localStorage.getItem(key);

      if (value) {
        const parsedValue = JSON.parse(value);

        //check if expired and remove if it is

        const expiryInMilliseconds = parsedValue.expiryInMilliseconds;


        if (expiryInMilliseconds < now) {
          removeItem(key);
          continue;
        } else {
          items.push({
            key: key,
            value: parsedValue.value,
            expiryInMilliseconds: expiryInMilliseconds,
          });
        }
      }
    }
  }

  return items;
};

const validateNumber = (value: string) => {
  const regex = /^[-+]?\d*\.?\d+$/;

  if (regex.test(value)) {
    return true;
  }

  return false;
};

export { setItem, getItem, removeItem, clear, getAllItems, validateNumber };
