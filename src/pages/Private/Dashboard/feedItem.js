export const mapFeedItem = (feedItem) => {
    if (!feedItem) {
        return feedItem;
    }

    const res = {};

    if (feedItem.Type === 'credit') {
        res.transactionAmount = feedItem.CreditAmount;
        res.confirmations = feedItem.Confirmations;
        res.confirmed = feedItem.Confirmed;
    }
    if (feedItem.Type === 'debit') {
        res.transactionAmount = feedItem.FinalDebitAmount;
        res.txfee = feedItem.TxFee;
    }
    res.type = feedItem.Type;
    res.id = feedItem.Id;
    res.txId = feedItem.TxId;
    res.createdAt = new Date(feedItem.CreatedAt).getTime();
    res.balanceBefore = feedItem.BalanceBefore;
    res.balanceAfter = feedItem.BalanceAfter;
    res.address = feedItem.ToAddress;

    return res;
}
