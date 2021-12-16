export const getBodyMsg = (originalMsg) => {
    if (!originalMsg) return <span></span>;

    let fullMessage = originalMsg;
    const regExp = new RegExp(/.*('.*').*/i)
    let match = regExp.exec(fullMessage);

    for (let i = 1; i < match.length; i++) {
        const stringInParenthesisToBold = match[i];
        console.log(stringInParenthesisToBold)
        fullMessage = fullMessage.replace(stringInParenthesisToBold, `<span class="fw-bold">${stringInParenthesisToBold}</span>`);
    }

    return `<span>${fullMessage}</span>`
}

export const getMinDate = () => {
    //format = `2021-12-01T08:30`
    const now = new Date(Date.now());
    const dayAsString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
    const hoursAndSeconds = `${now.getHours().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    return `${dayAsString}T${hoursAndSeconds}`
}