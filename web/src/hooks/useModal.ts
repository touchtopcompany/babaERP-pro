import { useState } from "react";

function useModal<T = any>() {
  const [modal, setModal] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<T | null>(null);

  const openModal = (
    action: string,
    record: T | null = null,
    callback: () => void = () => {}
  ) => {
    setModal((prev) => ({ ...prev, [action]: true }));
    if (record) setData(record);
    if (callback) callback();
  };

  const closeModal = (action: string, callback: () => void = () => {}) => {
    setModal((prev) => ({ ...prev, [action]: false }));
    setData(null);
    if (callback) callback();
  };

  return { modal, openModal, closeModal, data };
}

export default useModal;
