/**
 * Formats a number into a money string with proper comma separators
 * @param amount - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param addSymbol - Whether to add currency symbol (default: true)
 * @returns Formatted money string
 */
export const formatMoney = (
    amount: number,
    decimals: number = 2,
    addSymbol: boolean = true
): string => {
    try {
        // Handle negative numbers
        const isNegative = amount < 0;
        const absAmount = Math.abs(amount);

        // Format the number with proper decimal places
        const formattedNumber = absAmount.toFixed(decimals);

        // Split the number into whole and decimal parts
        const [wholePart, decimalPart] = formattedNumber.split('.');

        // Add commas to the whole part
        const withCommas = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Combine the parts
        const finalNumber = decimalPart 
            ? `${withCommas}.${decimalPart}`
            : withCommas;

        // Add negative sign and dollar symbol if needed
        return `${isNegative ? '-' : ''}${addSymbol ? '$' : ''}${finalNumber}`;
    } catch (error) {
        return 'Invalid input';
    }
};