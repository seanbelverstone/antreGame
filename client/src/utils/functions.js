export const camelToTitle = value => {
const result = value.replace(/([A-Z])/g, " $1");
return result.charAt(0).toUpperCase() + result.slice(1);
};
