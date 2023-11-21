function blackFriday(buy, sell, amount) {
    let profit = (sell * 0.95) - buy;
    let totalProfit = amount * profit;
    console.log(profit);
}
blackFriday(3100, 4100, 30)
blackFriday(3700, 7000, 30)
blackFriday(3100, 7000, 30)