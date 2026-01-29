export type SelectedItem = {
  id: string;
  email: string;
  name: string;
};

export interface SelectableEntity {
  id?: string;
  email?: string;
  firstName?: string;
}

export const getAllItems = <T extends SelectableEntity>(
  items: T[] = [],
): SelectedItem[] => {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => !!item?.id)
    .map(({ id = "", email = "", firstName = "" }) => ({
      id,
      email,
      name: firstName,
    }));
};

export const toggleAllSelections = <T extends SelectableEntity>(
  checked: boolean,
  items: T[] = [],
  currentSelections: SelectedItem[] = [],
): SelectedItem[] => {
  const validItems = Array.isArray(items) ? items : [];
  const validSelections = Array.isArray(currentSelections)
    ? currentSelections
    : [];

  if (checked) {
    const newSelections = getAllItems(validItems);
    const existingIds = new Set(
      validSelections.map((s) => s?.id).filter(Boolean),
    );
    const toAdd = newSelections.filter((s) => s?.id && !existingIds.has(s.id));
    return [...validSelections, ...toAdd];
  } else {
    const idsToRemove = new Set(
      validItems.map((i) => i?.id).filter((id) => !!id) as string[],
    );
    return validSelections.filter((s) => s?.id && !idsToRemove.has(s.id));
  }
};

export const toggleSingleSelection = (
  id: string,
  email: string,
  name: string,
  checked: boolean,
  currentSelections: SelectedItem[] = [],
): SelectedItem[] => {
  const validSelections = Array.isArray(currentSelections)
    ? currentSelections
    : [];

  if (checked) {
    if (!validSelections.some((item) => item?.id === id)) {
      return [...validSelections, { id, email, name }];
    }
    return validSelections;
  }
  return validSelections.filter((item) => item?.id !== id);
};

export const areAllItemsSelected = <T extends SelectableEntity>(
  items: T[] = [],
  selectedItems: SelectedItem[] = [],
): boolean => {
  if (!Array.isArray(items) || !items.length) return false;
  const validSelections = Array.isArray(selectedItems) ? selectedItems : [];
  const selectedIds = new Set(
    validSelections.map((s) => s?.id).filter(Boolean),
  );
  return items.every((i) => !!i?.id && selectedIds.has(i.id));
};

export const areSomeItemsSelected = <T extends SelectableEntity>(
  items: T[] = [],
  selectedItems: SelectedItem[] = [],
): boolean => {
  if (!Array.isArray(items) || !items.length) return false;
  const validSelections = Array.isArray(selectedItems) ? selectedItems : [];
  const selectedIds = new Set(
    validSelections.map((s) => s?.id).filter(Boolean),
  );
  const allSelected = items.every((i) => !!i?.id && selectedIds.has(i.id));
  const anySelected = items.some((i) => !!i?.id && selectedIds.has(i.id));
  return anySelected && !allSelected;
};
