export const shortenAddress = (address: string, start = 5, end = 4) => {
    return `${address.slice(0, start)}...${address.slice(address.length - end)}`;
}