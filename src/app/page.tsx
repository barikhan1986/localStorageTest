"use client";

import { useEffect, useState } from "react";
import LocalStorageItem, {
  clear,
  getAllItems,
  removeItem,
  setItem,
  validateNumber,
} from "./helper";

export default function Home() {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [expiry, setExpiry] = useState<number>(10000);

  const [allItems, setAllItems] = useState<LocalStorageItem[]>([]);

  const refetchItems = () => {
    setAllItems(getAllItems());
  };

  const clearForm = () => {
    setKey("");
    setValue("");
    setExpiry(10000);
  };

  useEffect(() => {
    refetchItems();
  }, []);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setItem(key, value, expiry);
    refetchItems();
    clearForm();
  };

  return (
    <main className="container mx-auto p-8 md:p-24">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">
          Local Storage with expiration time
        </h1>

        <p className="text-lg font-semibold">
          This is an example of how to use local storage with expiration time.
        </p>

        <hr></hr>

        <h1 className="text-2xl font-bold">Current LocalStorage Items</h1>

        {allItems.length ? (
          <div className="flex flex-col md:flex-row items-center justify-start gap-4">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Key</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Expiry</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {allItems.map((item) => (
                  <tr key={item.key}>
                    <td className="border px-4 py-2">{item.key}</td>
                    <td className="border px-4 py-2">{item.value}</td>
                    <td className="border px-4 py-2">
                      {item.expiryInMilliseconds}
                    </td>

                    <td className="border px-4 py-2">
                      <div
                        className="text-red-600 hover:text-red-800 cursor-pointer w-full text-center"
                        onClick={() => {
                          removeItem(item.key!);
                          refetchItems();
                        }}
                      >
                        X
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-2xl font-bold text-left">No Items Found :(</div>
        )}

        <hr></hr>

        <input
          type="button"
          value="Clear Local Storage"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          onClick={() => {
            clear();
            refetchItems();
          }}
          tabIndex={4}
        />

        <hr></hr>
        <form onSubmit={handleAddItem}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <label className="block text-white text-sm font-bold">Key</label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter Key"
              tabIndex={1}
              autoFocus
              required
            />
            <label className="block text-white text-sm font-bold">Value</label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter Value"
              tabIndex={2}
              required
            />

            <label className="block text-white text-sm font-bold">
              expiry In Milliseconds
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              autoComplete="off"
              pattern="[0-9]*"
              value={expiry}
              onChange={(e) => {
                if (validateNumber(e.target.value) === false) return;

                setExpiry(parseInt(e.target.value));
              }}
              placeholder="Enter Expiry In Milliseconds"
              tabIndex={3}
              required
            />

            <input
              type="submit"
              value="Set Key"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              tabIndex={4}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
