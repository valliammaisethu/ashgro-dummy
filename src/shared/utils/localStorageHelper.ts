import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

class LocalStorageHelper {
  setItem(key: LocalStorageKeys, value: unknown) {
    if (value === undefined) return;
    const stringified = JSON.stringify(value);
    if (stringified !== undefined) {
      localStorage.setItem(key, stringified);
    }
  }

  getItem(key: LocalStorageKeys) {
    const value = localStorage.getItem(key);
    if (!value || value === "undefined" || value === "null") {
      return {};
    }

    if (value.startsWith("{") || value.startsWith("[")) {
      return JSON.parse(value);
    }

    return {};
  }

  removeItem(key: LocalStorageKeys) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}

export const localStorageHelper = new LocalStorageHelper();
