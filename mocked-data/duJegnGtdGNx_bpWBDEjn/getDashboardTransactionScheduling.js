function getFutureDate(millisecondsInFuture) {
    // Get the current time
    const currentDate = new Date();

    // Calculate the future time by adding the specified milliseconds
    const futureTime = new Date(currentDate.getTime() + millisecondsInFuture);

    // Return the future Date object
    return futureTime;
}

var mockedData = {
    "transactions": [
        {
            "transactionId": crypto.randomUUID(),
            "scheduled": getFutureDate(1000)
        },
        {
            "transactionId": crypto.randomUUID(),
            "scheduled": getFutureDate(2000)
        },
        {
            "transactionId": crypto.randomUUID(),
            "scheduled": getFutureDate(60*1000)
        },
        {
            "transactionId": crypto.randomUUID(),
            "scheduled": getFutureDate(60050)
        },
        {
            "transactionId": crypto.randomUUID(),
            "scheduled": getFutureDate(61050)
        },

    ]
}
