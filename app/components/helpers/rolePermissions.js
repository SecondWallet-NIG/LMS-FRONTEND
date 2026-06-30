export const CFO_EQUIVALENT_TAGS = ["CFO", "FCO"];

export const hasCfoPermissions = (roleTag) => {
  return CFO_EQUIVALENT_TAGS.includes(roleTag);
};
