export default function ResetArrayData ( array ) {
    const resetData = [...array];
    resetData.map((data) => {
        data.checked = false;
    })
    return resetData;
}