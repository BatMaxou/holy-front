const cn = (...classes) => {
    return classes.reduce((acc, item) => {
        if (typeof item === 'string') {
            return acc ? `${acc} ${item}` : item
        } else if (typeof item === 'object') {
            const cls = item ? Object.keys(item).filter(key => item[key]).join(' ') : null

            return cls
                ? acc
                    ? `${acc} ${cls}`
                    : cls
                : acc
        }

        return acc
    }, null)
}

export default cn;
