export default function resetArrayData ( array ) {
    const resetData = [...array];
    resetData.map((data) => {
        data.checked = false;
    })
    return resetData;
}