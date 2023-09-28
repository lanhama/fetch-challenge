const crypto = require('crypto');

const calc_points = (req, res, next) => {

    try
    {
        const myRetailer = req.body.retailer;
        const purchaseDay = Number(req.body.purchaseDate.substring(9, 11));
        const purchaseHour = Number(req.body.purchaseTime.substring(0, 2));
        const myTotal = Number(req.body.total);
        const myReceiptItems = req.body.items;

        let totalPoints = 0;

        totalPoints += (purchaseDay % 2 !== 0) ? 6 : 0;
        totalPoints += isPurchaseBetweenTwoAnd4(purchaseHour) ? 10 : 0;
        totalPoints += (myTotal % 1 === 0) ? 50 : 0;
        totalPoints += (myTotal % 0.25 === 0) ? 25 : 0;
        totalPoints += Math.floor(myReceiptItems.length / 2) * 5;

        totalPoints += countAlphaNumeric(myRetailer);
        totalPoints += calculateReceiptItemPoints(myReceiptItems);

        if (totalPoints === null 
            || typeof totalPoints !== 'number'
            || isNaN(totalPoints))
        {
            throw new Error('improperly formatted receipt');
        }

        // hash receipt details to create ID
        res.locals.id = crypto.createHash('sha1').update(JSON.stringify(req.body)).digest('hex');
        
        res.locals.points = totalPoints;

        next();
    } catch (err) 
    {
        console.error(err);
        res.status(400).send('improperly formatted receipt')
    }
}

const isAlphaNumeric = (aChar) =>
{
    return (aChar >= 48 && aChar <= 57)
    || (aChar >= 65 && aChar <= 90)
    || (aChar >= 97 && aChar <= 122);
}

const countAlphaNumeric = (aRetailer) => 
{
    let myTotalPoints = 0;

    for (i in aRetailer)
    {
        if (isAlphaNumeric(aRetailer.charCodeAt(i)))
        {
            myTotalPoints += 1;
        }
    }

    return myTotalPoints;
}

const isPurchaseBetweenTwoAnd4 = (aPurchaseHour) =>
{
    return aPurchaseHour >= 14 && aPurchaseHour < 16;
}

const calculateReceiptItemPoints = (aReceiptItems) => {

    let myTotalPoints = 0
    for (item in aReceiptItems)
    {
        const itemDescription = aReceiptItems[item].shortDescription.trim();
        const itemPrice = Number(aReceiptItems[item].price);

        if (itemDescription.length % 3 === 0)
        {
            myTotalPoints += Math.ceil(itemPrice * 0.2);
        }
    }

    return myTotalPoints;
}

exports.calc_points = calc_points;