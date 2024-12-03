export const fixDuplication = (array) => {
    return array.filter((item, index) => array.indexOf(item) === index);
}
